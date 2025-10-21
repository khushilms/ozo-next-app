import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Accordion from '@/components/Accordion';
import { getTitleCase } from '@/utils/textUtils';
import { FormDataType } from '@/types/form';
import ButtonLoader from '@/components/ButtonLoader';
import Image from 'next/image';
import Input from './Input';


interface AddEditProductProps {
  isEditMode?: boolean;
  productId?: string | null;
  categoryId?: string | null;
}

function AddEditProduct({
  isEditMode = false,
  productId = null,
  categoryId = null,
}: AddEditProductProps) {
  const router = useRouter();
  const [productCategoryId, setProductCategoryId] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditMode);
  const [form, setForm] = useState<FormDataType | null>(
    isEditMode ? null : {
      name: "",
      description: "",
      image: "",
      route: "",
      howItWorks: "",
      benefits: [],
      keyFeatures: [],
      howToUse: [],
    });

  useEffect(() => {
    const activeAccordionComponent = document.getElementById(activeAccordion || "");
    if (activeAccordionComponent) {
      setTimeout(() => {
        activeAccordionComponent.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }, 200);
    }
  }, [activeAccordion]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setForm({
          name: data.name ?? "",
          description: data.description ?? "",
          image: data.image ?? "",
          route: data.route ?? "",
          howItWorks: data.howItWorks ?? "",
          benefits: data.benefits ?? [],
          keyFeatures: data.keyFeatures ?? [],
          howToUse: data.howToUse ?? [],
        });
        setProductCategoryId(data.categoryId ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (productId && isEditMode) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    if (isEditMode && productCategoryId) {
      router.push(`/admin/category/${productCategoryId}`);
    } else if (categoryId) {
      router.push(`/admin/category/${categoryId}`);
    } else {
      router.push('/admin');
    }
  };

  const handleArrayChange = (
    field: "benefits" | "keyFeatures" | "howToUse",
    index: number,
    key: "title" | "description",
    value: string
  ) => {
    if (!form) return;
    const updated = [...form[field]];
    updated[index][key] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayItem = (field: "benefits" | "keyFeatures" | "howToUse") => {
    if (!form) return;
    setForm({
      ...form,
      [field]: [...form[field], { title: "", description: "" }],
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, categoryId: Number(categoryId) }),
      });

      if (!res.ok) throw new Error("Failed to create product");
      router.push(`/admin/category/${categoryId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      // Redirect to the category page after saving
      router.push(`/admin/category/${productCategoryId}`);
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  if (loading) {
    return (
      <div className='p-10'>
        <ButtonLoader />
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-2">
      <div className='mb-4'>
        <button onClick={handleBack} className='text-blue-500 hover:underline cursor-pointer text-sm'>&larr; Back</button>
      </div>
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? "Edit Product" : "Add New Product"}</h1>
      <Accordion
        id="product-description"
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        title='Product Description'
        content={
          <div className='flex flex-col gap-4 w-full bg-gray-200 p-4 rounded'>
            <Input
              name="name"
              value={form?.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
            <div className='flex flex-col gap-1'>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form?.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 rounded bg-white h-[200px]"
              />
            </div>
            {
              form?.image &&
              <div className='h-40 w-40 border rounded self-center'>
                <Image
                  src={form.image}
                  alt="Product Image"
                  width={0}
                  height={0}
                  className="h-full w-full object-contain"
                />
              </div>
            }
            <Input
              name="image"
              value={form?.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <Input
              name="route"
              value={form?.route}
              onChange={handleChange}
              placeholder="Route (e.g. /products/xyz)"
            />
            <div className='flex flex-col gap-1'>
              <label htmlFor="howItWorks" className="text-sm font-medium">How It Works</label>
              <textarea
                name="howItWorks"
                value={form?.howItWorks}
                onChange={handleChange}
                placeholder="How It Works"
                className="w-full p-2 rounded bg-white"
              />
            </div>
          </div>
        }
      />
      {(["benefits", "keyFeatures", "howToUse"] as const).map((section) => (
        <Accordion
          id={`product-${section}`}
          key={section}
          title={getTitleCase(section)}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          content={
            <div className='bg-gray-200 p-4 rounded'>
              <p className='text-xs text-gray-400 pb-2'>Please add items to the {getTitleCase(section)} section.</p>
              {form?.[section].map(
                (item: { title: string; description: string }, i: number) => (
                  <div key={i} className={`flex gap-2 mb-4 items-start ${i === form[section].length - 1 ? '' : 'border-b border-gray-400 pb-4'}`}>
                    <p className='text-sm'>{i + 1}.</p>
                    <div className='flex flex-col gap-2 w-full'>
                      <Input
                        name={`${section}-title-${i}`}
                        value={item.title}
                        onChange={(e) =>
                          handleArrayChange(section, i, "title", e.target.value)
                        }
                        placeholder="Title"
                      />
                      <div className='flex flex-col gap-1'>
                        <label htmlFor={`${section}-description-${i}`} className="text-sm font-medium">Description</label>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleArrayChange(section, i, "description", e.target.value)
                          }
                          placeholder="Description"
                          className="p-2 rounded bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(form)[section]];
                        updated.splice(i, 1);
                        setForm({ ...form, [section]: updated });
                      }}
                      className="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                )
              )}
              <button
                type="button"
                onClick={() => addArrayItem(section)}
                className="text-white bg-ozo-green w-full text-center text-sm p-2 rounded cursor-pointer"
              >
                + Add
              </button>
            </div>
          }
        />
      ))}
      <button
        onClick={isEditMode ? handleUpdate : handleCreate}
        className="px-4 py-2 self-end bg-ozo-green text-white rounded hover:bg-ozo-green/70 cursor-pointer"
      >
        {isEditMode ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}

export default AddEditProduct;