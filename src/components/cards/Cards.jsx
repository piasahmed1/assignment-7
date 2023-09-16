import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Card from "../card/Card";
const photos = () => {
  const [photos, setphotos] = useState([]);
  const [targetphoto, settargetphoto] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalRemainingHours, setRemainingHours] = useState(20);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setphotos(data));
  }, []);

  const handlephotoselect = (cardItem) => {
    const existSelect = targetphoto.find((id) => id.id === cardItem.id);
    let creditHours = cardItem.credit;

  
    if (existSelect) {
      return Swal.fire({
        icon: "error",
        title: "Oops...Already Exists!!",
      });
    } else {
      
      targetphoto.forEach((credit) => {
        creditHours = creditHours + credit.credit;
      });
      
      let totalCost = cardItem.price;
      targetphoto.forEach((total) => {
        totalCost += total.price;
      });
      setTotalPrice(totalCost);

      const remainingHours = 20;
      let newRemainingHours = remainingHours - creditHours;
      if (creditHours > 20) {
        return Swal.fire("Your Remaining Hours is Finished!");
      }
      

      setRemainingHours(newRemainingHours);
      setTotalCredit(creditHours);
      const newSelected = [...targetphoto, cardItem];
      settargetphoto(newSelected);
    }
  };

  
  console.log(totalPrice);
  return (
    <>
      <h2 className="text-4xl font-semibold text-center mt-8">
        Course Registration
      </h2>
      <div className="flex gap-5 lg:mx-10 my-12 justify-evenly lg:flex-wrap lg:flex-row md:flex-col flex-col">
        <div className=" lg:w-[75%] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photos, id) => (
            <Card
              photos={photos}
              key={id}
              handlephotoselect={handlephotoselect}
            ></Card>

          ))}
        </div>
        <div className="lg:w-[20%] h-full p-6 bg-white rounded-md px-7">
          <h2 className="text-xl text-blue-500 my-3 font-semibold ">
            Credit Hour Remaining {totalRemainingHours} hr
          </h2>
          <hr />
          <h1 className="text-[20px] font-bold my-4">Course Name</h1>
          <ol className="list-decimal list-inside">
            {targetphoto.map((select, idx) => (
              <li className="text-base font-semibold" key={idx}>
                {" "}
                {select.title}
              </li>
            ))}
          </ol>
          <hr className="my-3" />
          <h2 className=" text-xl font-semibold">
            Total Credit Hour : {totalCredit}
          </h2>
          <hr className=" my-3" />
          <h2 className="text-xl font-semibold">
            Total Price: {totalPrice} USD
          </h2>
        </div>
      </div>
    </>
  );
};

export default photos;
