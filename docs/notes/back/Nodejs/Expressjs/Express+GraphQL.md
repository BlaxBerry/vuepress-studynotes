# Express GraphQL

![](https://miro.medium.com/max/1200/1*z6KGBIxGxXpzcS7AKlDT_A.jpeg)

[[toc]]

## 服务器构建

### 安装

```bash
npm i express express-graphql graphql
```

### 开启服务器

1. 创建 Express.js 服务器

```js
// index.js
const express = require("express");
const app = express();

const port = 8080;
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
```

2. 导入 Express GraphQL

> 如下：
>
> 将 GraphQL API 服务器运行在 `localhost:8080`
>
> 并在 `localhost:8080/graphql`开启 IDE 调试工具

```js
const express = require("express");
const app = express();

// 导入 Express GraphQL 相关
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// 创建 schema 查询和类型
const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Query {
        user: User
    }
`);

// 定义 schema 的对应处理器 resolver
const rootValue = {
  user: () => ({
    name: () => "Andy",
    age: () => 28,
  }),
};

// 挂载 graphql 中间件
app.use(
  "/",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, // 开启浏览器的 Graphql IDE 调试工具
  })
);

const port = 8080;
app.listen(port, () => {
  console.log(`GraphQL API server running at http://localhost:${port}/graphql`);
});
```

```bash
nodemon index.js
```

## schema

schema 中定义**查询的语句**与**类型**

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type 自定义类型 {
        属性名: 类型
    }

    type Query {
        属性名: 类型
				属性名: 自定义类型
    }

		input 自定义input名{
        属性: 类型
				属性: 类型
    }

    type Mutation {
        属性名(自定义参数名: 自定义input名): 类型/自定义类型
    }
`);
```

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Query {
        user: User
				id: ID
    }
`);
```

## resolver

处理器 resolver 用来定义 schema 中查询名对应的数据

创建的对应数据的类型必须与 schema 中定义的一致

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Product {
        id: ID
        title: String
        price: Float
    }

    type Query {
        user: User
        product: Product
    }
`);

const rootValue = {
  user: () => ({
    name: () => "Andy",
    age: () => 28,
  }),
  product: () => ({
    id: () => "GBHNJNHBGVVBHNJKMJNHBGV",
    title: () => "耳机",
    price: () => 28.88,
  }),
};
```

## 类型

类型在 schema 中定义给属性

在 resolver 中创建的属性值的类型必须与 schema 中定义的一致

类型默认是 null 类型

若 schema 中定义了但 resolver 中没有对应值则查询结果为`null`

如下：查询 `age` 的结果为`null`

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
			name: String
			age: Int
    }
`);

const rootValue = {
  name: () => "Andy",
};
```

```js
query {
  age
}
```

## 查询类型

### Query 类型

Query 类型是查询类型，实质是个对象类型

作为所有数据查询的入口点，查询时只能从 query 中查

**Query 类型必须被定义，且只能有一个**

即使不查询只修改也要在 schema 中定义 Query 类型

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        属性名: 类型
				属性名: 自定义类型
    }
`);
```

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Query {
        id: ID
        user: User
    }
`);

const rootValue = {
  id: () => "GBHNJNHBGVVBHNJKMJNHBGV",
  user: () => ({
    name: () => "Andy",
    age: () => 28,
  }),
};
```

```js
query {
  id
  user {
    name
    age
  }
}
```

### 基本类型

- **String** 字符串类型

- **Int** 整数类型
- **Float** 浮点类型
- **Boolean** 布尔类型
- **ID** id 类型（唯一字符串）

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        id: ID
        name: String
        age: Int
        score: Float
        status: Boolean
    }
`);

const rootValue = {
  id: () => "FTYGUBHINIHUBGYV",
  name: () => "Andy",
  age: () => 28,
  score: () => 60.5,
  status: () => true,
};
```

### 对象类型

#### 单一对象

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type 自定义类型A {
        属性: 基本类型
    }

    type 自定义类型B {
        属性: 基本类型
    }

    type Query {
        属性: 自定义类型A
				属性: 自定义类型B
    }
`);
```

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Product {
        id: ID
        title: String
        price: Float
    }

    type Query {
        user: User
        product: Product
    }
`);

const rootValue = {
  user: () => ({
    name: () => "Andy",
    age: () => 28,
  }),
  product: () => ({
    id: () => "GBHNJNHBGVVBHNJKMJNHBGV",
    title: () => "耳机",
    price: () => 28.88,
  }),
};
```

```json
query {
  product{
    id
    title
    price
  }
}
```

---

#### 嵌套对象

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type 自定义类型A {
        属性: 基本类型
        属性: 自定义类型B
    }

    type 自定义类型B {
        属性: 基本类型
    }

    type Query {
        属性: 自定义类型A
    }
`);
```

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
    }

    type Product {
        id: ID
        title: String
        price: Float
        user: User
    }

    type Query {
        user: User
        product: Product
    }
`);

const rootValue = {
  product: () => ({
    id: () => "GBHNJNHBGVVBHNJKMJNHBGV",
    title: () => "耳机",
    price: () => 28.88,
    user: () => ({
      name: () => "Lili",
      age: () => 27,
    }),
  }),
};
```

```js
query {
  product{
    id
    title
    price
    user{
      name
      age
    }
  }
}
```

### 数组类型

#### 简单元素

数组元素不需要再单独指定类型来，直接赋值即可

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        属性: [基本类型]
    }
`);
```

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        hobies: [String]
        scores: [Float]
    }
`);

const rootValue = {
  hobies: () => ["抽烟", "喝酒", "烫头"],
  scores: () => [20, 95.5, 60],
};
```

```js
query {
  hobies
}
```

---

#### 复杂元素

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type 自定义类型A {
        属性: 基本类型
        属性: 自定义类型B
    }

    type 自定义类型B {
        属性: 基本类型
    }

    type Query {
        属性: [自定义类型A]
    }
`);
```

如下：

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        name: String
        age: Int
        blogs: [Blog]
    }

    type Blog {
        id: ID,
        title: String
        content: String
    }

    type Query {
        user: User
    }
`);

const rootValue = {
  user: () => ({
    name: () => "Lili",
    age: () => 27,
    blogs: () => [
      {
        id: "GBHNBGVVB93JKMJNHBGV",
        title: "专题一",
        content: "内容",
      },
      {
        id: "GBHNJNHBGVHBG6789HJ",
        title: "专题二",
        content: "内容",
      },
    ],
  }),
};
```

### 非空类型 !

若想规定查询结果返回值不能是`null`

可在 schema 中定义类型时加上 `类型!`

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
			属性: 类型!
			属性: [类型]!
			属性: [类型!]
			属性: [类型!]!
    }
`);
```

如下：查询`age`会提示报错不能返回一个空值

```js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
			name: String
			age: Int!
    }
`);

const rootValue = {
  name: () => "Andy",
};
```

```js
query {
  age
}
```

```{
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Query.age.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "age"
      ]
    }
  ],
  "data": null
}
```

### Query 查询参数

如下：通过`id`查询数组中的某个元素

```js
const DEFAULT_SKILLS = [
  {
    name: "Vue",
    id: "1",
    example: "EC Shopping App",
  },
  {
    name: "React",
    id: "2",
    example: "MOBA Character Detail",
  },
];

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type SkillItem {
        name: String!
        id: String!
        example: String!
    }
    type Query {
        skill(id: ID!): SkillItem
    }
`);

const rootValue = {
  skill: ({ id }) => {
    // console.log(id)
    return DEFAULT_SKILLS.find((item) => item.id === id);
  },
};
```

```js
query {
  skill(id: "1"){
    name
    id
    example
  }
}
```

或：

```js
query skill($id:ID!) {
  skill(id:$id){
    name
    id
    example
	}
}

{
  "id": "1"
}
```

## 修改类型

### Mutation 类型

修改/输入类型

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Mutation {
        自定义名(自定义参数名: 类型): 类型/自定义类型
    }
`);
```

### input 类型

若 Mutation 接收的参数很多可统一写为一个对象

但是该对象的类型必须是 input，必须通过 input 在 schema 中定义

```js
const { buildSchema } = require("graphql");
const schema = buildSchema(`
    input 自定义input名{
        属性: 类型
				属性: 类型
    }
    type Mutation {
        自定义名(自定义参数名: 自定义input名): 类型/自定义类型
    }
`);
```

如下：

```js
const DEFAULT_SKILLS = [
  {
    name: "Vue",
    id: "1",
  },
  {
    name: "React",
    id: "2",
  },
];

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Skill {
        name: String!
        id: String!
    }
    input CreateSkillInput{
        name: String!
    }
    type Mutation {
        createSkill(input: CreateSkillInput!): Skill
    }
`);

const rootValue = {
  createSkill: ({ input }) => {
    // console.log(input)
    const id = "FGVBHNJKKMJNH&6789";
    const newSkill = {
      name: input.name,
      id,
    };
    DEFAULT_SKILLS.push(newSkill);
    return newSkill;
  },
};
```

```js
mutation createSkill($input: CreateSkillInput!){
  createSkill(input: $input){
    name
    id
  }
}

{
  "input": {
    "name": "JavaScript"
  }
}
```

## Mutation 增删改实例

### 增加

如下：

```js
const DEFAULT_SKILLS = [
  {
    name: "Vue",
    id: "1",
  },
  {
    name: "React",
    id: "2",
  },
];

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Skill {
        name: String!
        id: String!
    }
		type Query {
        skills: [Skill]
    }
    input CreateSkillInput{
        name: String!
    }
    type Mutation {
        createSkill(input: CreateSkillInput!): Skill
    }
`);

const rootValue = {
  skills: DEFAULT_SKILLS,
  createSkill: ({ input }) => {
    // console.log(input)
    const id = "FGVBHNJKKMJNH&6789";
    const newSkill = {
      name: input.name,
      id,
    };
    DEFAULT_SKILLS.push(newSkill);
    return newSkill;
  },
};
```

```js
mutation createSkill($input: CreateSkillInput!){
  createSkill(input: $input){
    name
    id
  }
}

{
  "input": {
    "name": "JavaScript"
  }
}
```

### 删除

如下：

```js
const DEFAULT_SKILLS = [
  {
    name: "Vue",
    id: "1",
  },
  {
    name: "React",
    id: "2",
  },
];

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Skill {
        name: String!
        id: String!
        content: String!
    }
    type DeletitionMessage {
        success: Boolean!
        info: String!
    }
    type Mutation {
        deleteSkill(id: ID!): DeletitionMessage 
    }
    type Query {
        skills: [Skill]
    }
`);

const rootValue = {
  skills: DEFAULT_SKILLS,
  deleteSkill: ({ id }) => {
    const index = DEFAULT_SKILLS.find((item) => item.id == id);
    if (index) {
      DEFAULT_SKILLS.splice(index, 1);
      return {
        success: true,
        info: "删除成功",
      };
    } else {
      return {
        success: false,
        info: "删除失败",
      };
    }
  },
};
```

```js
mutation deleteSkill($id:ID!){
  deleteSkill(id:$id){
    success
    info
  }
}

{
  "id": "9"
}
{
  "id": "1"
}
```

### 修改

如下：

```js
const DEFAULT_SKILLS = [
  {
    name: "Vue",
    id: "1",
    content: "内容",
  },
  {
    name: "React",
    id: "2",
    content: "内容",
  },
];

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Skill {
        name: String!
        id: String!
				content: String!
    }
    input UpdateSkillInput {
        name: String!
				content: String!
    }
    type Mutation {
        updateSkill(
					id: ID!, 
					input: UpdateSkillInput!
				): Skill
    }
    type Query {
        skills: [Skill]
    }
`);

const rootValue = {
  skills: DEFAULT_SKILLS,
  updateSkill: ({ id, input }) => {
    // console.log(id, input)
    const skill = DEFAULT_SKILLS.find((item) => item.id == id);
    const { name, content } = input;
    skill.name = name;
    skill.content = content;
    return skill;
  },
};
```

```js
mutation updateSkill($id:ID!, $input: UpdateSkillInput!){
  updateSkill(id:$id, input: $input){
    name
    id
    content
  }
}

{
  "id": "1",
  "input": {
    "name": "haha",
    "content": "新"
  }
}
```

## 前端测试

### 方法一：IDE 工具

访问浏览器的 Graphql IDE 调试工具

```http
http://服务器域名/graphql/
```

```http
http://localhost:8080/graphql/
```

![](https://developers.cloudflare.com/analytics/static/b09bb23b243e05f350bfcc3528b07f1b/eb3fa/graphiql-doc-explorer.png)

> field 字段是根据定义的 schema

---

### 方法二：Apollo Client

[Apollo Client]()

---

### 方法三：axios

如下：通过 axios 请求数据

> - POST 请求
> - query 请求的内容是字符串格式的属性名
> - 返回数据存放在 data 中（下例中 axios 的返回值的 data 中的 data）

#### 查询所有

```js
axios({
  method: "POST",
  url: "http://localhost:8080/graphql",
  data: {
    query: `{
          query getUser{
						user{
							name
							age
						}
					}
      }`,
  },
}).then(({ data }) => {
  console.log(data.data.user);
});
```

#### 查询单个

```js
axios({
  method: "POST",
  url: "http://localhost:8080/graphql",
  data: {
    query: `{
          query getUser($id: ID!){
						user(id: ${id}){
							name
							age
						}
					}
      }`,
    variables: {
      id: "GBHNJMKJ123",
    },
  },
}).then(({ data }) => {
  console.log(data.data.user);
});
```

#### 增加

```js
axios({
  method: "POST",
  url: "http://localhost:8080/graphql",
  data: {
    query: `{
          muataion createUser($input: CreateUserInput!){
						createUser(input: ${input}){
							name
							age
						}
					}
      }`,
    variables: {
      input: {
        name: "新人",
        age: 29,
      },
    },
  },
}).then(({ data }) => {
  console.log(data.data.createUser);
});
```

#### 删除

```js
axios({
    method: "POST",
    url: "http://localhost:8080/graphql",
    data: {
      query: `{
          muataion deleteUser($id: ID!){
						deleteUser(id: ${id}){
							success
							message
						}
					}
      }`,
      variables: {
        id: "6789"
    },
  }).then(({ data }) => {
    console.log(data.data.deleteUser);
});
```

#### 修改

```js
axios({
    method: "POST",
    url: "http://localhost:8080/graphql",
    data: {
      query: `{
          muataion updateUser(
						$id: ID!,
						$input: UpdateUserInput!
					){
						updateUser(id: ${id}, input: ${input}){
							name
							age
						}
					}
      }`,
      variables: {
        id: "6789"
        input: {
          name: "新名",
          age: 29
        }
      }
    },
  }).then(({ data }) => {
    console.log(data.data.updateUser);
});
```
