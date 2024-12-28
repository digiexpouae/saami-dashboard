import React from 'react'


const renderLabel = (label) => {
  return (
    <label className="mb-3 block text-black dark:text-white">
      {label}
    </label>
  );
}
const renderField = (field, payload, handleChange) => {
  switch (field.type) {
    case 'textarea':
      return (
          <textarea
            key={field.name}
            id={field.name}
            value={payload[field.name] || ''}
            onChange={handleChange}
            name={field.name}
            placeholder={field.placeholder || ''}
            required={field.required}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      );

    case 'select':
      return (
        <select
          key={field.name}
          id={field.name}
          name={field.name}
          value={payload[field.name] || ''}
          onChange={handleChange}
          required={field.required}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white'
          }`}
        >
          <option value="" disabled>
            {field.placeholder || 'Select an option'}
          </option>
          {field.options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-body dark:text-bodydark"
            >
              {option.label}
            </option>
          ))}
        </select>
      );

    case 'file':
      return (
        <input
          key={field.name}
          id={field.name}
          type="file"
          name={field.name}
          onChange={handleChange}
          required={field.required}
          accept={field.accept || '*'}
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />
      );

    default:
      return (
          <input
            key={field.name}
            id={field.name}
            type={field.type || 'text'}
            name={field.name}
            value={payload[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder || ''}
            required={field.required}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      );
  }
};

const renderFormFromSchema = (schema, payload, handleChange) => {
  return schema.map((field) => {
    return <div className='my-5'>

      {renderLabel(field.label)}
      {renderField(field, payload, handleChange)}
    </div>
  });
};



const RenderForm = ({ schema,payload,handleChange, onSubmit, onCancel }) => {

  return (
    <div className='bg-white px-4 py-4 rounded-sm'>
      {renderFormFromSchema(schema,payload, handleChange )}


      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onSubmit}
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenderForm;