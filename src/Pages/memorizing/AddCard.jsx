import { useEffect, useState } from "react";
import { FileImage, X } from "lucide-react";
import { useFileUploader } from "../../hooks/FileProvider";

const AddCardForm = () => {
  const [count, setCount] = useState(1);
  const [cards, setCards] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    multiVoice: false,
    means: [createEmptyMean()],
    Idioms: [createEmptyIdiom()],
  });

  const colors = [
    "#4F46E5",
    "#059669",
    "#DC2626",
    "#7C2D12",
    "#7C3AED",
    "#DB2777",
  ];

  function createEmptyMean() {
    return {
      translate: "",
      definition: "",
      example: "",
      image: "",
    };
  }

  function createEmptyIdiom() {
    return {
      idiom: "",
      meaning: "",
      usage: "",
      example: "",
    };
  }

  const addCard = (cardData) => {
    const { word, pronunciation, means, Idioms, color = "#4F46E5" } = cardData;
    const newCard = {
      id: Date.now(),
      word,
      pronunciation,
      means,
      Idioms,
      color,
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      lastReviewed: null,
      difficulty: "medium",
    };
    setCards([...cards, newCard]);
  };

  const handleSubmit = () => {
    if (
      formData.word &&
      formData.means.every((m) => m.definition) &&
      formData.Idioms.every((i) => i.idiom && i.meaning)
    ) {
      addCard(formData);
      console.log("cards", cards);
      setCount(1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMeanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMeans = [...formData.means];
    updatedMeans[index][name] = value;
    setFormData({ ...formData, means: updatedMeans });
  };

  const handleIdiomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIdioms = [...formData.Idioms];
    updatedIdioms[index][name] = value;
    setFormData({ ...formData, Idioms: updatedIdioms });
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedMeans = [...formData.means];
      updatedMeans[index].image = reader.result;
      setFormData({ ...formData, means: updatedMeans });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setDragging(false);
    }
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleImageChange(index, droppedFile);
    }
  };

  const handleChoosePic = (index, e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      handleImageChange(index, file);
    }
  };

  const handleRemoveMean = (index) => {
    const updatedMeans = [...formData.means];
    updatedMeans.splice(index, 1);
    setFormData({ ...formData, means: updatedMeans });
  };

  const handleRemoveIdiom = (index) => {
    const updatedIdioms = [...formData.Idioms];
    updatedIdioms.splice(index, 1);
    setFormData({ ...formData, Idioms: updatedIdioms });
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div
      dir="rtl"
      className="p-10 w-full rounded-[8px] container shadow-xl my-5 mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
        إضافة كلمة جديدة
      </h2>

      <section className="flex flex-col gap-4">
        <Input
          value={formData.word}
          handleChange={handleChange}
          type="text"
          title="الكلمة"
          name="word"
          placeholder="أدخل الكلمة الإنجليزية"
          required
        />

        {!formData.multiVoice && (
          <Input
            handleChange={handleChange}
            type="text"
            title="النطق"
            name="pronunciation"
            value={formData.pronunciation}
            placeholder="/prəˌnʌnsiˈeɪʃən/"
          />
        )}

        <label className="flex items-center gap-2">
          <input
            onChange={handleChange}
            type="checkbox"
            name="multiVoice"
            checked={formData.multiVoice}
          />
          <p className="text-[14px] font-bold">له أكثر من نطق</p>
        </label>

        {/* Means section */}
        {formData.means.map((mean, index) => (
          <div
            key={index}
            className="max-h-[700px] border px-8 py-4 rounded-[8px] border-[#0000004f] flex flex-col gap-4 overflow-auto"
          >
            {formData.multiVoice && (
              <Input
                handleChange={(e) => handleMeanChange(index, e)}
                type="text"
                title="النطق"
                name="pronunciation"
                value={mean.pronunciation || ""}
                placeholder="/prəˌnʌnsiˈeɪʃən/"
              />
            )}
            <Input
              handleChange={(e) => handleMeanChange(index, e)}
              type="text"
              title="المعنى"
              name="translate"
              value={mean.translate || ""}
              placeholder="أدخل معنى الكلمة"
            />
            <TextArea
              name="definition"
              placeholder="أدخل شرح الكلمة"
              value={mean.definition || ""}
              handleChange={(e) => handleMeanChange(index, e)}
              required
              title="شرح الكلمة"
            />
            <TextArea
              name="example"
              placeholder="جملة توضح استخدام الكلمة"
              value={mean.example || ""}
              handleChange={(e) => handleMeanChange(index, e)}
              title="مثال"
            />

            <div
              className={`${
                dragging ? "border-blue-400 border-dashed" : ""
              } relative overflow-hidden rounded-[8px] border-2 duration-100 w-[300px] h-full hover:border-blue-400 mx-auto`}
            >
              {mean.image && (
                <span
                  onClick={() => {
                    const updatedMeans = [...formData.means];
                    updatedMeans[index].image = "";
                    setFormData({ ...formData, means: updatedMeans });
                  }}
                  className="absolute cursor-pointer top-2 left-2 z-10 text-red-600"
                >
                  <X size={20} />
                </span>
              )}
              <label className="rounded-[8px] flex justify-center items-center">
                {mean.image ? (
                  <img
                    src={mean.image}
                    className="object-cover w-full h-full rounded-[8px]"
                    alt="img"
                  />
                ) : (
                  <div
                    onDrop={(e) => handleDrop(index, e)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="flex cursor-pointer p-10 w-full flex-col gap-2 justify-center items-center"
                  >
                    <p>اسحب الصورة و أفلتها هنا</p>
                    <FileImage size={30} />
                  </div>
                )}
                <input
                  name="image"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChoosePic(index, e)}
                />
              </label>
            </div>

            <button
              onClick={() => handleRemoveMean(index)}
              className="self-end text-red-600 text-sm font-medium hover:underline"
            >
              حذف هذا المعنى
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            setCount((prev) => prev + 1);
            setFormData((prev) => ({
              ...prev,
              means: [...prev.means, createEmptyMean()],
            }));
          }}
          className="border rounded-[8px] py-1 px-5 w-fit bg-black text-white"
        >
          معنى آخر
        </button>

        {/* Idioms Section */}
        <h3 className="text-lg font-semibold pt-6">التعابير الاصطلاحية (Idioms)</h3>
        {formData.Idioms.map((idiom, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-[8px] px-8 py-4 flex flex-col gap-4"
          >
            <Input
              handleChange={(e) => handleIdiomChange(index, e)}
              type="text"
              title="التعبير الاصطلاحي"
              name="idiom"
              value={idiom.idiom || ""}
              placeholder="مثال: Break the ice"
              required
            />
            <Input
              handleChange={(e) => handleIdiomChange(index, e)}
              type="text"
              title="المعنى"
              name="meaning"
              value={idiom.meaning || ""}
              placeholder="المعنى العام للتعبير"
              required
            />
            <TextArea
              handleChange={(e) => handleIdiomChange(index, e)}
              title="طريقة الاستخدام"
              name="usage"
              value={idiom.usage || ""}
              placeholder="متى يستخدم التعبير"
            />
            <TextArea
              handleChange={(e) => handleIdiomChange(index, e)}
              title="مثال"
              name="example"
              value={idiom.example || ""}
              placeholder="جملة توضح التعبير"
            />
            <button
              onClick={() => handleRemoveIdiom(index)}
              className="self-end text-red-600 text-sm font-medium hover:underline"
            >
              حذف هذا التعبير
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              Idioms: [...prev.Idioms, createEmptyIdiom()],
            }))
          }
          className="border rounded-[8px] py-1 px-5 w-fit bg-black text-white"
        >
          تعبير اصطلاحي آخر
        </button>

        {/* Color & Submit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            لون الكرت
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color
                    ? "border-gray-800"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
          >
            إضافة الكرت
          </button>
          <button className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 font-medium">
            إلغاء
          </button>
        </div>
      </section>
    </div>
  );
};

const Input = ({
  handleChange,
  title,
  type,
  required,
  placeholder,
  value,
  name,
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      <p className="px-3 py-1">{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-[8px] focus:border-2 duration-100 focus:border-blue-400 outline-none"
        required={required}
      />
    </label>
  );
};

const TextArea = ({
  handleChange,
  title,
  required,
  placeholder,
  value,
  name,
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      <p className="px-3 py-1">{title}</p>
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-[8px] focus:border-2 duration-100 focus:border-blue-400 outline-none"
        required={required}
      />
    </label>
  );
};

export default AddCardForm;
