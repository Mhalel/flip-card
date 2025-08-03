import { BookOpen } from "lucide-react";

const ThisDayCard = () => {
  return (
    <div className="flex justify-center w-full h-full   items-center  flex-col gap-5">
      <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        لا توجد كروت حتى الآن
      </h3>
      <p className="text-gray-500">ابدأ بإضافة أول كلمة لك!</p>
    </div>
  );
};




export default ThisDayCard;
