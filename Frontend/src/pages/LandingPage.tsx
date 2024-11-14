import { useNavigate } from "react-router-dom";

export const LandingPage = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  return (
    <>
      {/* Header Navigation */}
      <header className="flex justify-between items-center h-20 px-10 border-b border-gray-300">
        <div className="text-2xl font-bold">Medium</div>
        <nav className="flex items-center space-x-6">
          <a href="/about" className="hover:text-gray-700">Our Story</a>
          <a href={token ? "/publish" : "/signin"} className="hover:text-gray-700">Write</a>
          <a href="/signin" className="hover:text-gray-700">Sign In</a>
          <button onClick={()=>{navigate("/signup")}} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
            Get Started
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center pt-10 px-10">
        {/* Headline and Image Section */}
        <section className="flex flex-col md:flex-row items-center mb-20">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/2 md:pr-10 m-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              Human
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              stories & ideas
            </h2>
            <p className="mt-4 text-lg">A place to read, write, and deepen your understanding</p>
            <button onClick={()=>{
              if(token){
                navigate("/blog");
              }else{
                navigate("/signin");
              }
              }} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 mt-6">
              Start Reading
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center w-full md:w-1/2 mt-6 md:mt-0">
            <img
              src="dashboard.webp" // Replace with your image URL
              alt="Illustration representing ideas and stories"
              className="w-[460px] h-[600px] object-cover rounded-lg "
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-300">
        <p>© 2024 Medium. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <a className="hover:text-gray-700">About</a>
          <a className="hover:text-gray-700">Contact</a>
          <a className="hover:text-gray-700">Privacy Policy</a>
          <a className="hover:text-gray-700">Terms of Service</a>
        </nav>
      </footer>
    </>
  );
};
