import { useNavigate } from "react-router-dom";

export const LandingPage = () => {

  const navigate = useNavigate();
  return (
    <>
      {/* Header Navigation */}
      <header className="flex justify-between items-center h-20 px-10 border-b border-gray-300">
        <div className="text-2xl font-bold">Medium</div>
        <nav className="flex items-center space-x-6">
          <a href="/about" className="hover:text-gray-700">Our Story</a>
          <a href="/publish" className="hover:text-gray-700">Write</a>
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
            <button onClick={()=>{navigate("/signin")}} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 mt-6">
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

        {/* Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example article card */}
          {Array.from({ length: 6 }, (_, index) => (
            <article key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold">Article Title {index + 1}</h3>
              <p className="mt-2">A short excerpt of the article goes here...</p>
              <div className="mt-4 text-sm text-gray-600">By Author | Oct 1, 2024</div>
              <a href="#" className="text-blue-500 hover:underline mt-2 block">Read More</a>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-300">
        <p>© 2024 Medium. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-700">About</a>
          <a href="#" className="hover:text-gray-700">Contact</a>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700">Terms of Service</a>
        </nav>
      </footer>
    </>
  );
};