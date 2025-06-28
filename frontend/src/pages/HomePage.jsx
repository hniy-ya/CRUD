import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { HandCoinsIcon, PackageIcon, PlusCircle, RefreshCcw, SearchIcon, SearchXIcon, ShoppingBagIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProduct from "../components/AddProduct";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
    const { products, loading, error, fetchProducts } = useProductStore();

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-8  ">
                <div className="flex flex-wrap gap-2 justify-between items-center   ">
                    <button
                        className="btn btn-primary "
                        onClick={() => document.getElementById("add_product_modal").showModal()}
                    >
                        <PlusCircle className="size-5 mr-2" />
                        <AddProduct />
                        Add Product
                    </button>

                    <button className="btn btn-info ml-3" onClick={() => navigate("/POS")}>
                        <ShoppingBagIcon className="size-5 mr-2 mx-auto" />
                        POS
                    </button>
                </div>

                <button className="btn btn-ghost btn-circle w-full sm:w-auto ">
                    <RefreshCcw className="size-5 mr-2 mx-auto" />
                </button>
            </div>

            {error && <div className="alert alert-error mb-8">{error}</div>}
            {products.length == 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-base-100 rounded-full p-6">
                        <PackageIcon className="size-12" />
                    </div>
                    <div className="text-center  space-y-2">
                        <h3 className="text-2xl font-semibold ">No product found</h3>
                        <p className="text-gray-500 max-w-sm">Get started by adding your first product</p>
                    </div>
                </div>
            )}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />;
                    })}
                </div>
            )}
        </main>
    );
}

export default HomePage;
