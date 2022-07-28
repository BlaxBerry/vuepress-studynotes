# express-graphql

![img](https://miro.medium.com/max/1200/1*z6KGBIxGxXpzcS7AKlDT_A.jpeg)

[[toc]]

## 官方文档

[详见](https://graphql.org/graphql-js/express-graphql/)

<br/>

## 安装配置

JavaScript 环境下载的依赖

```bash
npm install express express-graphql graphql
```

TypeScript 环境下载的依赖

```bash
npm install express express-graphql graphql typescript
npm install -D @types/express
```

> [Express.js + TS 的环境配置相见](../Basic/TS.md)
>
> 后文主要使用 TS 环境

<br/>

## 项目目录

```js
|- graphql
	|- api
		|- queries
		|- mutations
	|- schema  // 导出 Schema
	|- resolver // 导出 Resolvers
|- index.ts
|- package.json
|- tsconfig.json
```

<br/>

## 使用步骤

1. **服务器挂载 `express-graphql` 中间件**

```tsx
/* index.ts */
import express, { Express } from "express";
import cors from "cors";
import schema from "./graphql/schema";
import { graphqlHTTP } from "express-graphql";
const app: Express = express();

// 挂载 CORS 中间件
app.use(cors());

// 挂载 Graphql 中间件
app.use(
  "/graphql",
  express.json(),
  graphqlHTTP({
    schema,
    graphiql: true, // 开启浏览器的 Graphql IDE 调试工具
  })
);

app.listen(8080, () => {
  console.log(`Server runnning at http://localhost:8080`);
  console.log(`Graphql IDE Server runnning at http://localhost:8080/graphql`);
});

// 前端使用时比如 ApolloClient 链接的地址是 Graphql IDE 地址
```

---

1. **定义 Schema 查询语句与类型**

```tsx
/* graphql/schema/index.ts */
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import queryTypeFileds from "../api/queries";
import mutaionsTypeFileds from "..api/mutatiosn";

export default new GraphQLSchema({
  // queries
  query: new GraphQLObjectType({
    name: "Query",
    description: "IDE Query field 自定义描述 The root query type.",
    fields: {
      ...queryTypeFileds,
    },
  }),
  // mutations
  mutation: new GraphQLObjectType({
    name: "Mutation",
    description: "IDE Mutaion field 自定义描述 The root Mutation type.",
    fields: {
      ...mutaionsTypeFileds,
    },
  }),
});
```

---

3.**queries**

> queries 导出文件：

```tsx
/* graphql/queries/index.ts */
import getPersonList from "./getPersonList";

export default {
  getPersonList,
};
```

> 具体的一个 query

```tsx
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { getPersonList } from "../resolver";

export const PersonType = new GraphQLObjectType({
  name: "PersonType",
  description: "person",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The Person ID.",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The Person name.",
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The Person age.",
    },
  },
});

export const PersonListType = new GraphQLList(PersonType);

export default {
  type: PersonListType,
  description: "Get list of Person data.",
  resolve: getPersonList,
};

/*
query {
  getPersonList {
    id
    name
    age
  }
}
*/
```

---

1. **mutaions**

> mutations 导出文件：

```tsx
/* graphql/mutations/index.ts */
import createPerson from "./createPerson";

export default {
  createPerson,
};
```

> 具体的一个 mutaion：

```tsx
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { PersonListType } from "../queries/getPersonList";
import createPerson, { CreatePersonProps } from "../resolver/createPerson";

const InputType = new GraphQLInputObjectType({
  name: "PersonCreateInputType",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The Person name.",
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The Person age.",
    },
  },
});

export default {
  type: PersonListType,
  description: "Create person to list.",
  args: {
    input: {
      type: new GraphQLNonNull(InputType),
    },
  },
  resolve: (_: unknown, args: { input: CreatePersonProps }) => {
    return createPerson(args.input);
  },
};

/*
mutation createPerson($input: PersonCreateInputType!) {
  createPerson(input: $input) {
    id
    name
    age
  }
}

{
  input: {
  	name: "奥特曼",
    age: 29
  }
}
*/
```

---

1. **定义 Resolver 处理函数**

> query

```tsx
import { personList } from "../../data";

export interface CreatePersonProps {
  name: string;
  age: number;
}

export default function createPerson({ name, age }: CreatePersonProps) {
  const member = {
    id: personList.length + 1,
    name,
    age,
  };
  personList.push(member);
  return personList;
}
```

> mutation

```tsx
import { personList } from "../../data";

export interface CreatePersonProps {
  name: string;
  age: number;
}

export default function createPerson({ name, age }: CreatePersonProps) {
  const member = {
    id: personList.length + 1,
    name,
    age,
  };
  personList.push(member);
  return personList;
}
```
