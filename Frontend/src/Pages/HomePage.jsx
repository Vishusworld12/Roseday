import AddRose from "../components/AddRose";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

const HomePage = () => {
  const { roses } = useMainContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-4 my-10 justify-between items-center">

      <div className="col-span-1 lg:col-span-2 xl:col-span-3">
        <AddRose />
      </div>

      {roses.length > 0 &&
        roses.map((cur, i) => {
          return (
            <Link
              to={`/post/${cur.id}`}
              key={i}
              className="w-full rounded-md shadow inset-shadow-indigo-200 border-2"
            >
              <div className="mb-3 h-[30vh] overflow-hidden">
                <img
                  src={cur.image}
                  alt=""
                  className="w-full h-full hover:scale-150 transition-all duration-300 object-cover rounded-md"
                />
              </div>

              <div className="mb-3">
                <h1 className="text-center font-bold">
                  {cur.title}
                </h1>
              </div>
            </Link>
          );
        })}

    </div>
  );
};

export default HomePage;