import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

// Checkboxes
const MyCheckbox = ({ field, form, ...props }) => {
  return (
    <div>
      <label>
        Are You agree the above terms and condition?
        <input type="checkbox" {...field} {...props} />
        {props.label}
      </label>
      {form.errors[field.name] && form.touched[field.name] && (
        <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
      )}
    </div>
  );
};

// Inpput Field
const StyledField = ({ field, form, ...props }) => {
  return (
    <div>
      <input
        type="text"
        {...field}
        {...props}
        style={{
          border: form.errors[field.name] && form.touched[field.name] ? '1px solid red' : '1px solid gray',
          padding: '0.5em',
          margin: '0.5em 0',
          borderRadius: '5px'
        }}
      />
      {form.errors[field.name] && form.touched[field.name] && (
        <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
      )}
    </div>
  );
};

// Radio Button
function RadioButtonGroup({ label, ...props }) {
  const { field, form } = props;
  return (
    <div>
      <label htmlFor={`${field.name}-male`}>Male</label>
      <input
        type="radio"
        id={`${field.name}-male`}
        {...field}
        value="male"
        checked={field.value === 'male'}
      />
      <br />
      <label htmlFor={`${field.name}-female`}>Female</label>
      <input
        type="radio"
        id={`${field.name}-female`}
        {...field}
        value="female"
        checked={field.value === 'female'}
      />
      <br />
      <label htmlFor={`${field.name}-other`}>Other</label>
      <input
        type="radio"
        id={`${field.name}-other`}
        {...field}
        value="other"
        checked={field.value === 'other'}
      />
      {form.errors[field.name] && form.touched[field.name] ? (
        <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
}


// Dropdown 

const data = ['red', 'blue', 'green']
const DropdownValidationSchema = Yup.object().shape({
  color: Yup.string()
    .required('Color is required')
    .oneOf(
      data,
      'Invalid color. Choose red, blue, or green',
    ),
});

function DropdownField({ field, form: { touched, errors }, ...props }) {
  return (
    <div>
      <select {...field} {...props}>
        <option value="">Select a color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
      {touched[field.name] && errors[field.name] && (
        <div style={{ color: 'red' }}>{errors[field.name]}</div>
      )}
    </div>
  );
}


const MyForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required').oneOf(['male', 'female', 'other']),
    checkbox: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions"),
    color: Yup.string()
      .required('Color is required')
      .oneOf(
        data,
        'Invalid color. Choose red, blue, or green',
      ),

  });

  return (
    <Formik
      initialValues={{ name: '', email: '', gender: '', checkbox: false, color: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="name" component={StyledField} />
          <Field name="email" component={StyledField} />
          <Field name="gender" component={RadioButtonGroup} />
          <Field name="checkbox" component={MyCheckbox} />
          <Field name="color" component={DropdownField} />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
