import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";
export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProductt: null,
   
    searchTerm: "",
   formData:{
    name:'',
    price:'',
    quantity:'',
    image:''
   },

    


    setSearchTerm: (term) => set({ searchTerm: term }),

    

    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ formData: { name: "", price: "", quantity: "", image: "" } }),

    addProduct: async (e) => {
        e.preventDefault();
        set({ loading: true });

        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/product`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Product added successfully");
            document.getElementById("add_product_modal").close();
        } catch (error) {
            console.log("Error in addProduct function", error);
            toast.error("Something went wrong");
        } finally {
            set({ loading: false });
        }
    },

    fetchProducts: async () => {
        set({ loading: true });

        try {
            const response = await axios.get(`${BASE_URL}/api/product`);
            set({ products: response.data.data, error: null });
        } catch (error) {
            if (error.status == 429) set({ error: "Rate limit exceeded" });
            else set({ error: "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id) => {
        console.log("id", id);

        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/api/product/${id}`);
            set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
            toast.success(" Product deleted Successfully");
        } catch (error) {
            console.log("Error in deleteProduct function", error);
            toast.error("Something went wrong");
        } finally {
            set({ loading: false });
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true });

        try {
            const response = await axios.get(`${BASE_URL}/api/product/${id}`);
            set({ currentProduct: response.data.data, formData: response.data.data, error: null });
        } catch (error) {
            set({ error: "Something went wrong", currentProduct: null });
            console.log("Error in fetchFunction", error);
        } finally {
            set({ loading: false });
        }
    },
    updateProduct: async (id) => {
        set({ loading: true });

        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/api/product/${id}`, formData);
            set({ currentProduct: response.data });
            toast.success("Update Product succsessfully ");
        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error in Updatefunction", error);
        } finally {
            set({ loading: false });
        }
    },


        






 }));