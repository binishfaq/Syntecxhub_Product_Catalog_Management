import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaShieldAlt,
  FaStar,
  FaTruck,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6">

        {/* Background Blur */}
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>


        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">

          <div className="text-center">

            <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
              Premium Shopping Experience
            </span>


            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">

              Shop Smarter.
              <br />

              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Live Better.
              </span>

            </h1>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Explore thousands of quality products from different categories.
              A modern platform designed to provide a smooth and secure shopping
              experience.
            </p>



            <div className="mt-10 flex justify-center">

              <Link
                to="/products"
                className="group flex items-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-blue-600"
              >

                <FaShoppingBag />

                Explore Products

              </Link>

            </div>


          </div>

        </div>

      </section>




      {/* Premium Features */}

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-3">


        <div className="rounded-3xl border border-white bg-white/70 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">

            <FaShoppingBag />

          </div>


          <h3 className="text-xl font-bold text-slate-900">
            Premium Collection
          </h3>

          <p className="mt-3 text-slate-600">
            Browse carefully selected products with complete details and
            categories.
          </p>

        </div>




        <div className="rounded-3xl border border-white bg-white/70 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl text-yellow-600">

            <FaStar />

          </div>


          <h3 className="text-xl font-bold text-slate-900">
            Trusted Quality
          </h3>

          <p className="mt-3 text-slate-600">
            Quality products with reliable information and smooth browsing.
          </p>

        </div>




        <div className="rounded-3xl border border-white bg-white/70 p-8 shadow-xl backdrop-blur transition hover:-translate-y-2">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">

            <FaShieldAlt />

          </div>


          <h3 className="text-xl font-bold text-slate-900">
            Secure Platform
          </h3>

          <p className="mt-3 text-slate-600">
            Protected accounts and secure authentication for every user.
          </p>

        </div>


      </section>


      {/* Bottom Banner */}

      <section className="mx-6 mb-10 rounded-3xl bg-slate-900 px-8 py-12 text-center text-white shadow-2xl">

        <FaTruck className="mx-auto mb-4 text-4xl text-blue-400" />

        <h2 className="text-3xl font-bold">
          Everything You Need In One Place
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Discover products, explore categories, and enjoy a seamless shopping
          journey.
        </p>

      </section>


    </div>
  );
};

export default Home;