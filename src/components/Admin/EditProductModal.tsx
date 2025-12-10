'use client'

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { updateProduct } from "@/store/slices/adminProductSlice";
import { ProductType } from "@/types/ProductType";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { sort } from 'fast-sort';

type EditProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductType | null;
}

export default function EditProductModal({isModalOpen, setIsModalOpen, product}: EditProductModalProps ){
  const [name, setName] = useState<string>(product?.name || "");
  const [brand, setBrand] = useState<string>(product?.brand || "");
  const [year, setYear] = useState<number>(product?.year || 0);
  const [description, setDescription] = useState<string>(product?.description || "");
  const [capacity, setCapacity] = useState<number[]>(product?.capacity || []);
  const [image, setImage] = useState<string>(product?.images.main || "/images/default.jpg");
  const [priceNormal, setPriceNormal] = useState<number>(product?.price.normal || 0);
  const [priceSale, setPriceSale] = useState<number>(product?.price.sale || 0);
  const [type, setType] = useState<string | undefined>(product?.attributes?.type || "");
  const [gender, setGender] = useState<string>(product?.attributes?.gender || "");
  const [aroma, setAroma] = useState<string>(product?.attributes?.aroma || "");
  const [stability, setStability] = useState<string>(product?.attributes?.stability || "");
  const [classification, setClassification] = useState<string>(product?.attributes?.classification || "")

  const dispatch = useDispatch();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (product) {
      setYear(product.year);
      setBrand(product.brand);
      setType(product.attributes?.type);
    }
  }, [product]);

  const handleCapacityChange = (value: number, checked: boolean) => {
    setCapacity(prev =>
      checked ? sort([...prev, value]).asc() : sort(prev.filter(v => v !== value)).asc()
    );
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setImage(base64);
  }


  function submitChange(){
    if (!product) return;

    const updatedProduct : ProductType = {
      ...product,
      name: name,
      brand: brand,
      year: year,
      description: description,
      capacity,
      images: {
        ...product.images,
        main: image,
      },
      price: {
        normal: priceNormal,
        sale: priceSale,
      },
      attributes: {
        type: type,
        gender: gender,
        aroma: aroma,
        stability: stability,
        classification: classification,
      },
    };

    dispatch(updateProduct(updatedProduct))
    setIsModalOpen(false);
  }

  const genderLabels: Record<string, string> = {
    woman: t.genderWoman,
    man: t.genderMan,
    unisex: t.genderUnisex,
  };


  return (
    <div className={`fixed inset-0 z-1000 transition-all ${isModalOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-black/50"
      />
      <div
        className={`absolute right-1/2 top-1/2 md:top-1/2 -translate-y-1/2 translate-x-1/2
          w-[85%] md:w-150 p-4 rounded-[10px]
          bg-white transition-transform duration-500
          flex flex-col gap-3
          `}
      >
        <div className="w-full flex justify-center">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="w-8 h-8 text-2xl cursor-pointer absolute right-4 top-4 flex items-center justify-center"
          >
            <RiCloseFill />
          </button>
          <p className="font-semibold text-base md:text-2xl">{t.informationUpdate}</p>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <ul className="w-full min-h-60 h-max py-4 flex flex-col gap-1 text-sm lg:text-base">
            <li><span className="font-semibold">{t.name}: </span>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li><span className="font-semibold">{t.brand}: </span>
              <input 
                type="text"
                value={brand}
                onChange={(e) => setBrand(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li><span className="font-semibold">{t.premiere}: </span> 
              <input 
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li><span className="font-semibold">{t.description}: </span>
              <textarea
                className="max-w-100 w-full h-20 border text-black px-2 p-0.5 rounded"
                value={description}
                onChange={(e) => setDescription(String(e.target.value))}
              >
                {description}
              </textarea>
            </li>
            <li>
              <span className="font-semibold">{t.capacity}: </span>
              <ul className="flex flex-row gap-3">
                {[25, 50, 100, 150, 200, 250, 500].map(val => (
                  <li key={val}>
                    <input
                      type="checkbox"
                      name="capacity"
                      id={val.toString()}
                      checked={capacity.includes(val)}
                      onChange={e => handleCapacityChange(val, e.target.checked)}
                    />
                    <label htmlFor={val.toString()}> {val}</label>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex flex-col gap-2">
              <span className="font-semibold">{t.image}:</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border text-black px-2 p-0.5 rounded"
              />

              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-32 h-32 object-cover border rounded"
                />
              )}
            </li>

            <li><span className="font-semibold">{t.priceNormal}: </span> 
              <input 
                type="number"
                value={priceNormal}
                onChange={(e) => setPriceNormal(Number(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li><span className="font-semibold">{t.priceSale}: </span> 
              <input 
                type="number"
                value={priceSale}
                onChange={(e) => setPriceSale(Number(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li>
              <span className="font-semibold">{t.type}: </span>
              <input 
                type="text"
                value={type}
                onChange={(e) => setType(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li>
              <span className="font-semibold">{t.gender}: </span>
              <ul>
                {["woman", "man", "unisex"].map(val => (
                  <li key={val}>
                    <input 
                      type="radio"
                      name="gender"
                      id={val}
                      checked={gender === val}
                      onChange={() => setGender(val)}
                    /> <label htmlFor={val}> {genderLabels[val]}</label>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="font-semibold">{t.aroma}: </span>
              <input 
                type="text"
                value={aroma}
                onChange={(e) => setAroma(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li>
              <span className="font-semibold">{t.stability}: </span>
              <input 
                type="text"
                value={stability}
                onChange={(e) => setStability(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
            <li>
              <span className="font-semibold">{t.classification}: </span>
              <input 
                type="text"
                value={classification}
                onChange={(e) => setClassification(String(e.target.value))}
                className="border text-black px-2 p-0.5 rounded"
              />
            </li>
          </ul>
        </div>
        <button 
        type="submit"
        className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg flex items-center justify-center cursor-pointer text-white bg-black"
        onClick={submitChange}
        >
          {t.submitChange}
        </button>
      </div>
    </div>
  )
}