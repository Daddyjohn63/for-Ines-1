'use client';
import { categories } from '@/components/Categories';
import CategoryInput from '@/components/CategoryInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      category: ''
    }
  });

  const category = watch('category');
  const [jsonString, setJsonString] = useState('');

  const setCustomValue = (id, value) => {
    const currentValue = watch(id); // This line retrieves the current value of the category from the form.
    if (currentValue === value) {
      // This checks if the currently clicked category is the same as the already selected one.
      setValue(id, '', {
        // If the category is the same, it clears the selection.
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    } else {
      setValue(id, value, {
        // If it's a new category, it sets it as the selected category.
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
  };

  const onSubmit = data => {
    if (category) {
      const jsonString = JSON.stringify(data);
      setJsonString(jsonString);
      console.log(data);
      reset();
    } else {
      toast.error('please select a category');
      //could set an error state and then render message under the list of activities (rather than use toast)
      return;
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <h1>Please do your thing</h1>
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map(item => (
          <div key={item.label} className=" text-white col-span-1">
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-6">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">React Hook Forms</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {bodyContent}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(jsonString).replace(/\\\"/g, '"')}</pre>
      </div>
    </section>
  );
}
