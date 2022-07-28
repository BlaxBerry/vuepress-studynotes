# react-hook-form

![img](https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/docs/logo.png)

[[toc]]

## 安装

```bash
yarn add react-hook-form
# react-hook-form": "^7.27.0"
```

<br/>

## useForm()

`useForm()` 是用于轻松管理表单的自定义钩子

```jsx
const {
  register,
  control,
  handleSubmit,
  setValue,
  getValues,
  watch,
  formState: { errors },
} = useFrom();
```

---

### 参数

`useForm()` 可接受可选参数，默认参数如下：

```jsx
useForm({
  // 提交表单之前验证的触发时机
  mode: "onSubmit",
  // 提交表单后重新验证的触发时机
  reValidateMode: "onChange",
  defaultValues: {},
  resolver: undefined,
  context: undefined,
  criteriaMode: "firstError",
  shouldFocusError: true,
  shouldUnregister: false,
  shouldUseNativeValidation: false,
  delayError: undefined,
});
```

---

### handleSubmit()

如果表单验证成功，此函数将接收表单数据

> 如下：

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} />
      <input type="submit" />
    </form>
  );
};

export default App;
```

> 如下：提交错误时返回所有错误信息[errors](#errors)

```jsx
import React from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const onError = (errors) => console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input type="text" {...register("name", { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default App;
```

---

### register()

`register()`方法用于注册表单和设置验证

参数是要验证的输入框标签名（`name`属性）和对象形式的验证选择项

该方法返回值在 React 中需要解构为输入框标签属性

```jsx
<input {...register("输入框名")} >

<input {...register("输入框名", 验证选择项)}>
```

---

::: tip 常用验证项 options：

- **required**
- **min**
- **max**
- **minLength**
- **maxLength**
- **pattern**
- **validate**

:::

::: tip 验证项 options 值的两种写法：

- 直接写

```jsx
<input
  {...register("输入框名", {
    验证条件: 验证标准值,
    验证条件: 验证标准值,
  })}
/>
```

- 写成对象形式：
  - `value`：为验证的标准
  - `message`：为验证错误时的信息，可通过结构`useForm()`后的[errors](#errors)对象获取

```jsx
<input
  {...register("输入框名", {
    验证条件: {
      value: 验证标准值,
      message: "错误信息",
    },
    验证条件: {
      value: 验证标准值,
      message: "错误信息",
    },
  })}
/>
```

:::

---

### errors

用对象形式返回将所有的错误对象

首次渲染默认是个空对象`{}`

可通过 [`setError()`](<#setError()>)手动设置错误信息

```jsx
const {
  formState: { errors },
} = useForm();
console.log(errors);
/*
{
  输入框名: {type: '验证类型', message: '错误信息', ref: 输入框标签类型} },
  输入框名: {type: '验证类型', message: '错误信息', ref: 输入框标签类型} }
}
*/
```

> 如下：

```jsx
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register("Email", {
          required: true,
          pattern: /^\S+@\S+$/i,
          minLength: 7,
        })}
      />
      {errors.Email?.type === "required" && <span>required</span>}
      {errors.Email?.type === "pattern" && <span>regexp</span>}
      {errors.Email?.type === "minLength" && <span>min-length</span>}
      <br />
      <input
        type="text"
        placeholder="Phone"
        {...register("Phone", {
          required: {
            value: true,
            message: "required",
          },
          pattern: {
            value: /^\d+$/,
            message: "仅限非负整数",
          },
          minLength: {
            value: 6,
            message: "more than 6",
          },
          maxLength: {
            value: 12,
            message: "less than 12",
          },
        })}
      />
      {errors.Phone && <span>{errors.Phone?.message}</span>}
      <br />
      <select {...register("Country", { required: true })}>
        <option value="">---选择---</option>
        <option value="USA">USA</option>
        <option value="CN">CN</option>
        <option value="UK">UK</option>
      </select>
      {errors.Country && <span>{errors.Country?.message}</span>}
      <br />
      gender:
      <input
        type="radio"
        value="Male"
        {...register("Gender", { required: true })}
      />
      <input
        type="radio"
        value="Female"
        {...register("Gender", { required: true })}
      />
      <br />
      <button type="submit">提交</button>
    </form>
  );
}
```

---

### setValue()

用于编程式设置输入框的内容

```js
setValue("输入框名", 要填入的数据);
```

> 如下：

```jsx
import * as React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, setValue } = useForm();

  return (
    <form>
      <label>
        <span>Name:</span>
        <input {...register("Name")} />
      </label>
      <button
        onClick={() => {
          setValue("Name", "默认name");
        }}
      >
        填写默认name
      </button>
    </form>
  );
}
```

---

### getValues()

获取当前输入框内容

若想同步获取最新值需要通过 [watch()](<#watch()>) 方法

```js
getValues("输入框名");
```

> 如下：

```jsx
import * as React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, getValues } = useForm();

  const searchZip = async () => {
    console.log(getValues("zip"));
  };

  return (
    <form>
      <label>postal code</label>
      <input {...register("zip")} />
      <button type="button" onClick={searchZip}>
        邮编查询
      </button>
    </form>
  );
}
```

---

### watch()

监听输入框内容的变化

```js
const watchXXX = watch("输入框名");
```

> 如下：

```jsx
import * as React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, watch } = useForm();

  const watchName = watch("Name");

  return (
    <form>
      <label>Name</label>
      <input {...register("Name")} />
      <p>{watchName}</p>
    </form>
  );
}
```

---

### setError()

用于设定错误信息、错误类型、对应的 Input 输入框

```jsx
const { setError } = useForm();
setError(输入框name, {
  type: "错误类型",
  message: "错误信息",
});
```

设置的错误信息可通过[errors](#errors)获取

```js
const {
  formState: { errors },
} = useForm();
console.log(errors);
/*
{
  输入框名: {type: '验证类型', message: '错误信息', ref: 输入框标签类型} },
  输入框名: {type: '验证类型', message: '错误信息', ref: 输入框标签类型} }
}
*/
```

<br/>

## Controller

`Controller` 组件用于包裹**受控组件**

比如 **React-Select、AntD、Material-UI** 等第三方或自定义受控组件

```jsx
import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="select"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
};

export default App;
```

---

### control

`control` 对象来调用`useForm()`

---

### rules

用于设置验证规则

与`useForm()`的 [`register()`](#register) 相同

> 如下：

```jsx
<Controller
  name="firstName"
  control={control}
  rules={{ required: true }}
  render={({ field }) => <Input {...field} />}
/>;
{
  errors.firstName && <span>firstName is required.</span>;
}
```

---

### render

是一个渲染函数

将事件和状态等传递给被包裹的受控子组件

> 如下：

```jsx
<Controller
  control={control}
  name="test"
  render={({
    field: { onChange, onBlur, value, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState,
  }) => (
    <Checkbox
      onBlur={onBlur}
      onChange={onChange}
      checked={value}
      inputRef={ref}
    />
  )}
/>


<Controller
  name="firstName"
  control={control}
  render={({ field }) => <Input {...field} />}
/>
```

<br/>

## useFormContext

表单在一个子组件里面时用到父子组件传值

> 如下：

```jsx
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return <input {...register("test")} />;
}

export default function App() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      {" "}
      // pass all methods into the context
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
```

<br/>

## :x:FormProvider

<br/>

## :x:WizardFormFunnel
