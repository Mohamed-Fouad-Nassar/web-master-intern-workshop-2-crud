import React, { useRef } from "react";
import addImage from "../assets";

const ProductForms = ({use}) => {
  const uploadImg = useRef();
  const uploadImgs = useRef();
  return (
    <div class="productForms">
      <h1>{use} Product</h1>
      <form action="" className="ml-3">
        <div>
          <label>Title</label>
          <input type="text" name="title" placeholder="Enter Title" />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
          />
        </div>
        <div className="flex justify-start items-center flex-row w-[100%]">
          <div>
            <label>Price</label>
            <input type="number" name="price" placeholder="Enter Price" />
          </div>
          <div>
            <label>Discount</label>
            <input type="number" name="discount" placeholder="Enter Discount" />
          </div>
        </div>
        <div>
          <label>Product Images</label>
          <div>
            <input
              className="p-5 cursor-pointer"
              type="file"
              id="image-upload"
              name="image"
              accept="image/*"
              ref={uploadImgs}
              multiple
              hidden
            />
            <div
              className="addImage"
              onClick={() => uploadImgs.current.click()}
            >
              <img src={addImage} alt="addImage" />
            </div>
          </div>
        </div>
        <div>
          <label>Cover Image</label>
          <input
            type="file"
            id="image-upload"
            name="image"
            accept="image/*"
            ref={uploadImg}
            hidden
          />
          <div className="addImage" onClick={() => uploadImg.current.click()}>
            <img src={addImage} alt="addImage" />
          </div>
        </div>
        <input type="submit" value="submit" className="button" />
      </form>
    </div>
  );
};

export default ProductForms;
