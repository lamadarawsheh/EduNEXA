import React, { useEffect, useState } from "react";


const TeacherDashboard = () => {
   
  // الحالة للأرقام
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [rating, setRating] = useState(0);

  // Target values
  const targetStudents = 10000;
  const targetCourses = 500;
  const targetRating = 49; // 4.9 * 10 for decimal

  useEffect(() => {
    // Increment speed
    const speed = 50;

    const studentsInterval = setInterval(() => {
      setStudents((prev) => {
        if (prev >= targetStudents) {
          clearInterval(studentsInterval);
          return targetStudents;
        }
        return prev + Math.ceil(targetStudents / speed);
      });
    }, 50);

    const coursesInterval = setInterval(() => {
      setCourses((prev) => {
        if (prev >= targetCourses) {
          clearInterval(coursesInterval);
          return targetCourses;
        }
        return prev + Math.ceil(targetCourses / speed);
      });
    }, 50);

    const ratingInterval = setInterval(() => {
      setRating((prev) => {
        if (prev >= targetRating) {
          clearInterval(ratingInterval);
          return targetRating;
        }
        return prev + 1;
      });
    }, 50);
  }, []);
 

      const cards = [
    {
      image: "/images/card1.png",
      title: "1. Apply to become Teacher.",
      description: "Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consequat eu."
    },
    {
      image: "/images/card2.png",
      title: "2. Setup & edit your profile.",
      description: "Duis non ipsum at leo efficitur pulvinar. Morbi semper nisi eget accumsan ullamcorper."
    },
    {
      image: "/images/card3.png",
      title: "3. Create your new course",
      description: "Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque. "
    },
    {
      image: "/images/card4.png",
      title: "4. Start teaching & earning",
      description: "Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque. ."
    },
  ];

  // بيانات النقاط
  const points = [
    "Sed ullamcorper libero quis condimentum .",
    "Praesent euismod magna sit amet sem facilisis .",
    "Morbi ac sapien a libero sollicitudin elementum.",
    "Fusce ullamcorper nibh non justo efficitur."
  ];
  return (
    <div >
        <h1 className="text-center text-[#093332] font-bold ">Become an Teacher</h1>
      <div className=" flex items-center justify-center">
  <div className="flex items-center gap-4 pb-4 text-center text-[#093332]">
    <span>Home</span>
    <span>Become an Teacher</span>
  </div>
</div>


<section
      className="
        w-full
        bg-[#176D69]
        text-white
        rounded-b-[35px]
      "
    >      {/* المحتوى */}
      <div className="container mx-auto px-6  grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        {/* ===== Right Side (Image) ===== */}
        {/* في الموبايل الصورة فوق */}
        <div className="order-1 lg:order-2 flex justify-center">
          <img
            src="/image/bg-teacher.png"
            alt="Hero"
            className="w-[74%] max-w-md"
          />
        </div>

        {/* ===== Left Side (Text) ===== */}
        <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Become an Teacher <br />
          </h1>

          <p className="text- text-lg pb-5">
            Become an Teacher & start teaching with 26k certified<br/> instructors. Create a success story with 67.1k Students<br/> — Grow yourself with 71 countries.
          </p>

          <button className="
            bg-[#A6E5E3]
            text-white
            px-6
            py-3
            font-semibold
            hover:opacity-90
            transition
          ">
            Get Started
          </button>
        </div>
      </div>
    </section>

    <section className="w-full bg-white py-20">
      <div className="
        max-w-7xl
        mx-auto
        px-6
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-12
        items-center
      ">

        {/* ===== Left Image ===== */}
        <div className="flex justify-center">
          <img
            src="/images/teaching.png"
            alt="Teaching"
            className="w-full max-w-md"
          />
        </div>

        {/* ===== Right Content ===== */}
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172B]">
            Why you’ll start teaching on <br />
            <span className="text-[#25ADA7]">Eduguard</span>
          </h1>

          <p className="text-[#093332] text-sm ">
         Praesent congue ornare nibh sed ullamcorper. Proin venenatis <br/>tellus non turpis scelerisque, vitae auctor arcu ornare. Cras vitae<br/> nulla a purus mollis venenatis. 
          </p>
       

          
   <div className="flex flex-col gap-1">
  {/* الجملة مع أيقونة ✓ */}
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-[#176D69]">
      <span className="text-white font-bold text-sm sm:text-base">✓</span>
    </div>

    <h5 className="font-semibold text-[#093332] text-sm sm:text-base">
      Teach your students as you want.
    </h5>
  </div>

  {/* النص التوضيحي تحتها */}
  <p className="text-[#176D69] text-sm ps-8  ">
    Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus.
  </p>
</div>
   <div className="flex flex-col gap-1">
  {/* الجملة مع أيقونة ✓ */}
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-[#176D69]">
      <span className="text-white font-bold text-sm sm:text-base">✓</span>
    </div>

    <h5 className="font-semibold text-[#093332] text-sm sm:text-base">
      Teach your students as you want.
    </h5>
  </div>

  {/* النص التوضيحي تحتها */}
  <p className="text-[#176D69] text-sm ps-8  ">
    Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus.
  </p>
</div>
   <div className="flex flex-col gap-1">
  {/* الجملة مع أيقونة ✓ */}
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-[#176D69]">
      <span className="text-white font-bold text-sm sm:text-base">✓</span>
    </div>

    <h5 className="font-semibold text-[#093332] text-sm sm:text-base">
      Teach your students as you want.
    </h5>
  </div>

  {/* النص التوضيحي تحتها */}
  <p className="text-[#176D69] text-sm ps-8  ">
    Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus.
  </p>
</div>


        </div>

      </div>
    </section>

     <section className="w-full bg-[#A6E5E3] py-15">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* العنوان */}
        <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172B] mb-12">
          How you'll become <br></br> successful Teacher
        </h1>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-lg flex flex-col items-center text-center shadow-lg">
              <img src={card.image} alt={card.title} className="w-16 h-16 mb-4" />
              <span className="font-semibold text-[#0F172B] mb-2">{card.title}</span>
              <p className="text-[#176D69] text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
       <section className="w-full bg-white py-20 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ===== Left Side (Text) ===== */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-[#0F172B]">
            Teacher rules & regulations
          </h1>
          <p className="text-[#176D69] text-sm">
            Sed auctor, nisl non elementum ornare, turpis orci consequat<br/> arcu, 
            at iaculis quam leo nec libero. Aenean mollis turpis velit, id <br/>
            laoreet sem luctus in. Etiam et egestas lorem.
          </p>

          {/* النقاط الأربع */}
          <div className="space-y-2 mt-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
                <p className="text-black">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right Side (Image) ===== */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/rules-image.png"
            alt="Rules"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
    <section className="w-full bg-white py-20">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* ===== Left Side (Text) ===== */}
    <div className="space-y-6 text-center lg:text-left">
      <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172B]">
        20k+ Teachers created their success story with <br/> Eduguard
      </h1>

      <p className="text-[#176D69] text-sm">
Nunc euismod sapien non felis eleifend porttitor.<br/> Maecenas dictum eros justo, id commodo ante laoreet nec. Phasellus aliquet,<br/> orci id pellentesque mollis.      </p>

      {/* ===== Background Section A6E5E3 ===== */}
      <div className="bg-[#A6E5E3] p-6 rounded-lg space-y-4">
<div className="flex  justify-center lg:justify-start mt-4">
    <div className="   flex items-center justify-center relative ">
      <div className="absolute top-0 w-8 h-4 "></div>
      <span className="text-black text-3xl font-bold leading-none ">9</span>
    </div>
    <div className=" rounded-full flex items-center justify-center relative ">
      <div className="absolute top-0 w-8 h-4 "></div>
      <span className="text-black text-3xl font-bold leading-none ">9</span>
    </div>
  </div>
        <p className="text-[#0F172B] text-sm">
          Nulla sed malesuada augue. Morbi interdum vulputate imperdiet. Pellentesque ullamcorper auctor ante, egestas interdum quam facilisis commodo. Phasellus efficitur quis ex in consectetur. Mauris tristique suscipit metus, a molestie dui dapibus vel.
        </p>

       
      </div>

      <div className="flex gap-4  mt-2">

 

  <button className="bg-[#A6E5E3] text-white px-3 py-1 font-semibold  flex items-center gap-2 hover:opacity-90 transition">
   
    <span className="text-black text-xl">←</span>
  </button>
 <button className="bg-[#0F4C4A] text-white px-3 py-1 font-semibold  flex items-center gap-2 hover:opacity-90 transition">
    
    <span className="text-white text-xl">→</span>
  </button>
</div>

    </div>

    {/* ===== Right Side (Image) ===== */}
    <div className="flex justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0">
      <img
        src="/images/teachers-success.png"
        alt="Teacher Success"
        className="w-full max-w-md"
      />
    </div>

  </div>
</section>

       
    
    <section className="w-full bg-[#A6E5E3] py-20 ps-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ===== Right Side (Image) ===== */}
        {/* order-1 موبايل → فوق, lg:order-2 → دسكتوب يمين */}
        <div className="order-1 lg:order-2 flex justify-center mb-6 lg:mb-0">
          <img
            src="/images/start-teaching.png"
            alt="Start Teaching"
            className="w-full max-w-md"
          />
        </div>

        {/* ===== Left Side (Text) ===== */}
        {/* order-2 موبايل → تحت, lg:order-1 → دسكتوب يسار */}
        <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Start teaching with us<br/> and inspire others
          </h1>

          <p className="text-[#176D69] text-sm">
            Become an instructor & start teaching with 26k certified<br/> instructors. 
            Create a success story with 67.1k Students<br/> — Grow yourself with 71 countries.
          </p>

          <button className="bg-[#0F4C4A] text-white px-6 py-3  font-semibold hover:opacity-90 transition">
            Register now
          </button>
        </div>

      </div>
    </section>
    </div>
  );
};


export default TeacherDashboard;
