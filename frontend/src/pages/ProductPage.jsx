import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SaveIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";

function ProductPage() {
    const { formData, loading, fetchProduct, currentProduct, deleteProduct, updateProduct, setFormData, error } =
        useProductStore();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct(id);
    }, [fetchProduct, id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product")) {
            await deleteProduct(id);
            navigate("/");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="container mx-auto px-4 py-7">
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8 ">
            <button className="btn btn-ghost mb-4 " onClick={() => navigate("/")}>
                <ArrowLeft className="size-4" />
                Back to Products
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                <div className="overflow-hidden rounded-lg bg-base-100 shadow-lg">
                    <img src={currentProduct?.image} alt={currentProduct?.name} className="size-full object-cover " />
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body ">
                        <h2 className="card-title text-2xl mb-4">Edit Product</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateProduct(id);
                            }}
                            className="space-y-6"
                        >
                            <div className="form-control">
                                <label className="label w-full pb-2">
                                    <span className="label-text text-base font-medium">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full rounded-full  focus:input-primary transition-colors duration-200"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label w-full pb-2">
                                    <span className="label-text text-base font-medium">Price</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="input input-bordered w-full rounded-full  focus:input-primary transition-colors duration-200"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label w-full pb-2">
                                    <span className="label-text text-base font-medium">Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="input input-bordered w-full rounded-full focus:input-primary transition-colors duration-200"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-between mt-8  ">
                                <button type="button" className="btn btn-error rounded-full w-40" onClick={handleDelete}>
                                    <Trash2Icon className="size-4 mr-2 " />
                                    Delete Product
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-full w-40 "
                                    disabled={!formData.name || !formData.price || !formData.image || loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : (
                                        <>
                                            <SaveIcon className="size-4 mr-2 rounded-full" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
