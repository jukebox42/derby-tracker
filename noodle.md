# Structure
- /[resource]
  - page.tsx
  - /[id]
    - context.tsx
    - layout.tsx
    - page.tsx 
    - /[tab]
      - page.tsx
  - /_ui
    - ActionPopup.tsx
    - ActionModal.tsx
    - Preview.tsx

```js
const resources = [
  members,
  groups,
  
]
```

# Resource Data
```js
const memberDefinition = {
  alias: {
    key: "alias",
    label: "Derby Name",
    type: "string"
    render: (params) => renderValue.link(params.alias, `${routes.MEMBERS.path}/${params.id}`),
    validation: () => Yup.string().nullable(),
    permissions: [],
  },
  name: {
    key: "name",
    label: "Government Name",
    type: "string"
    render: (params) => renderValue.string(params.name),
    validation: () => Yup.string().required("Government name is required.")
    permissions: [],
  },
  email: {
    key: "email",
    label: "Email",
    type: "email",
    render: params => renderValue.string(params.email),
    validation: () => Yup.string().required("Email address is required.").email("Email Address is invalid."),
    permissions: [],
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    permissions: [Permission.MEMBER_MANAGE],
  },
}
```

```js
const members = {
  name: "Members",
  path: "/members",
  permissions: [Permission.MEMBER_READ, Permission.MEMBER_MANAGE],
  definition: definition,
  list: {
    actions: ["create"],
    api: function,
    searchFields: ["name", "alias", "number"],
    columns: {
      table: ["alias", "number", "name", "level", "isOnLoa", "preferredPosition", "createdAt"],
      list: ["number", "level", "preferredPosition"],
    }
    filters: [
      {
        label: "Level",
        name: "level",
        type: "string",
        options: levels,
      },
      {
        label: "Position",
        name: "preferredPosition",
        type: "string",
        options: positions,
      },
      {
        label: "LoA",
        name: "isOnLoa",
        type: "boolean",
        defaultValue: false,
      },
      {
        label: "Active",
        name: "active",
        type: "boolean",
        defaultValue: true,
        permissions: []
      }
    ],
  },
  details: {
    preview: {
      pictureApi: ZZZ,
      title: (member) => `${member.alias} ${member.number ? `#${member.number}` : ""}`,
      lists
    }
    tabs: [
      {
        name: "Profile",
        permissions: [],

      }
    ]
  },
  actions: {
    create: {
      type: "modal",
      component: <CreateForm />
      validation: {
        name: memberDefinition["name"].validation(),
        email: memberDefinition["email"].validation(),
        alias: memberDefinition["alias"].validation(),
        number: memberDefinition["number"].validation(),
        level: memberDefinition["level"].validation(),
        preferredPosition: memberDefinition["preferredPosition"].validation(),
      }
      permissions: [Permission.MEMBER_MANAGE]
    },
    create: {
      type: "modal",
      component: <CreateComponent />
      validation: {}
    }
  }
}
```