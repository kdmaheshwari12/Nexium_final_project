import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col p-24 md:px-24 lg:px-48 font-serif bg-blue-100">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mt-10 mb-2">Recipe Generator</h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-10">&ldquo;Cook with Confidence, Create with AI&ldquo;</p>

        <div className="w-full h-auto max-w-4xl mx-auto">
          <Image
            sizes="(max-width: 768px) 100vw, 1024px"
            width={1024}
            height={1024}
            style={{ width: "100%", height: "auto" }}
            alt="Recipe Generator"
            src="/bg-photo.jpg"
            className="rounded-lg object-cover"
          />
        </div>

        <section
          id="hero-section"
          className="p-6 md:p-10 my-8 md:my-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <p className="text-2xl md:text-4xl pb-4 md:pb-5">
            Discover delicious meals in seconds!
            Just enter a few ingredients or let our AI surprise you with creative, personalized recipes. Whether you're a home cook or a kitchen newbie, our generator makes cooking fun, easy, and inspiring.
          </p>
          <Link
            href="/generate"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-lg md:text-xl lg:text-2xl w-full md:w-auto text-center"
          >
            Get Started
          </Link>
          <hr className="my-6 border-t-2 border-gray-300 w-full md:w-3/4 mx-auto" />
        </section>

          <section id="how-it-works" className="bg-white/70 rounded-lg shadow-md p-6 md:p-10 my-10 text-lg md:text-xl lg:text-2xl">
            Generate a detailed and easy-to-follow recipe using the following ingredients:
            <br />
            <span className="font-semibold">Ingredients:</span> chicken, garlic, rice, butter, chili flakes
            <ul className="list-disc pl-5 my-4">
              <li>A creative and descriptive title</li>
              <li>Estimated cooking time</li>
              <li>Number of servings</li>
              <li>List of ingredients with measurements</li>
              <li>Step-by-step cooking instructions</li>
            </ul>
          </section>

            <section id="why_choose_us" className="bg-blue-50 rounded-lg shadow-md p-6 md:p-10 my-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg">
              <li>AI-powered recipe generation for endless creativity</li>
              <li>Easy-to-use interface for cooks of all skill levels</li>
              <li>Personalized recipes based on your ingredients</li>
              <li>Step-by-step instructions for stress-free cooking</li>
              <li>Save time and reduce food waste</li>
            </ul>
            </section>

            <section id="testinomials" className="bg-gray-50 rounded-lg shadow-md p-6 md:p-10 my-10 w-full max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-4 text-center">Testimonials</h2>
              <p className="text-lg mb-6 text-center">
              Hear from our happy users! People from all walks of life have discovered the joy of cooking with our AI-powered recipe generator. Whether you’re a busy professional, a student, or a home chef, our app helps you create delicious meals with ease and confidence.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg p-4 shadow text-center">
                <p className="italic">"This app made cooking so much easier and fun!"</p>
                <span className="block mt-2 font-semibold">- Kundan Kumar</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow text-center">
                <p className="italic">"I love the creative recipes. Highly recommended!"</p>
                <span className="block mt-2 font-semibold">- Rohit Kumar</span>
              </div>
              </div>
            </section>
      </main>
  );
}