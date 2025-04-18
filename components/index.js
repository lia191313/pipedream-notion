import { axios } from "@pipedream/platform";

export default defineComponent({
  props: {
    notionToken: {
      type: "string",
      label: "Notion Token",
      secret: true,
    },
    databaseId: {
      type: "string",
      label: "Notion Database ID",
    },
    titulo: {
      type: "string",
      label: "🧠 Título",
    },
    comentarios: {
      type: "string",
      label: "📝 Comentarios",
    },
    enlace: {
      type: "string",
      label: "🔗 Enlace",
    },
    fecha: {
      type: "string",
      label: "📅 Fecha",
    },
    utilidad: {
      type: "string",
      label: "📌 Utilidad",
    },
  },
  async run({ steps, $ }) {
    const response = await axios($, {
      method: "POST",
      url: "https://api.notion.com/v1/pages",
      headers: {
        Authorization: `Bearer ${this.notionToken}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      data: {
        parent: {
          database_id: this.databaseId,
        },
        properties: {
          "🧠 Titulo": {
            title: [
              {
                text: {
                  content: this.titulo,
                },
              },
            ],
          },
          "📝 Comentarios": {
            rich_text: [
              {
                text: {
                  content: this.comentarios,
                },
              },
            ],
          },
          "🔗 Enlace": {
            url: this.enlace,
          },
          "📅 Fecha": {
            date: {
              start: this.fecha,
            },
          },
          "📌 Utilidad": {
            select: {
              name: this.utilidad,
            },
          },
        },
      },
    });

    return response;
  },
});
