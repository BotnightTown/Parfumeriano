'use client'
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { ProductType } from "@/types/ProductType";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { sort } from 'fast-sort';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addProduct } from "@/store/slices/adminProductSlice";

type AddProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddProductModal({isModalOpen, setIsModalOpen}: AddProductModalProps ){
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number[]>([]);
  const [image, setImage] = useState<string>("/images/default.jpg");
  const [priceNormal, setPriceNormal] = useState<number>(0);
  const [priceSale, setPriceSale] = useState<number>(0);
  const [type, setType] = useState<string | undefined>("");
  const [gender, setGender] = useState<string>("");
  const [aroma, setAroma] = useState<string>("");
  const [stability, setStability] = useState<string>("");
  const [classification, setClassification] = useState<string>("")
  const { language } = useLanguage();
  
  const dispatch = useDispatch();
  const t = translations[language];
  const products = useSelector((s: RootState) => s.adminProducts.products);

  const handleCapacityChange = (value: number, checked: boolean) => {
    setCapacity(prev =>
      checked ? sort([...prev, value]).asc() : sort(prev.filter(v => v !== value)).asc()
    );
  };

  const genderLabels: Record<string, string> = {
    woman: t.genderWoman,
    man: t.genderMan,
    unisex: t.genderUnisex,
  };

  const lastIdProduct = () => {
    if (products.length === 0) return 0;
    return Math.max(...products.map((obj: ProductType) => obj.id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };


  function submitChange(){
    const newProduct : ProductType = {
      id: lastIdProduct() + 1,
      name: name,
      brand: brand,
      year: year,
      description: description,
      capacity,
      images: {
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
    
    dispatch(addProduct(newProduct))
    setIsModalOpen(false);
  }


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
          flex flex-col gap-5
          `}
      >
        <div className="w-full flex justify-center">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="w-8 h-8 text-2xl cursor-pointer absolute right-4 top-4 flex items-center justify-center"
          >
            <RiCloseFill />
          </button>
          <p className="font-semibold text-base md:text-2xl">{t.addProduct}</p>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <ul className="w-full flex flex-col gap-2 text-sm lg:text-base">
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
            <li>
              <span className="font-semibold">{t.image}: </span>

              <input 
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border text-black px-2 p-0.5 rounded"
              />
              {image && (
                <img 
                  src={image} 
                  alt="preview" 
                  className="mt-2 w-32 h-32 object-cover rounded"
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