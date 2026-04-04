import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  //upload image
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return; // Prevent empty uploads
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  // Delete image
  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Image Upload */}
      <div className="w-full">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-4 w-full sm:w-auto px-6"
        disabled={imageLoadingState || !uploadedImageUrl}
      >
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>

      {/* Uploaded Images List */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-6">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div key={index} className="flex flex-wrap relative">
              <img
                src={featureImgItem.image}
                alt={`Feature ${index + 1}`}
                className="w-full sm:h-48 md:h-56 object-cover rounded-lg shadow-sm"
              />

              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 px-2 py-1"
                onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
              >
                Delete
              </Button>
              
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            No feature images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
