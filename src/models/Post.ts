export default class Post {
  totalArticles?: number;
  articles?: Array<Article>;

  constructor(totalArticles?: number, articles?: Array<Article>) {
    this.totalArticles = totalArticles;
    this.articles = articles;
  }
}

export class Article {
  id: number;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: Date;
  source: Source;

  constructor(
    id?: number,
    title?: string,
    description?: string,
    content?: string,
    url?: string,
    image?: string,
    publishedAt?: Date,
    source?: Source
  ) {
    this.id = id ?? 0;
    this.title = title ?? "";
    this.description = description ?? "";
    this.content = content ?? "";
    this.url = url ?? "";
    this.image = image ?? "";
    this.publishedAt = publishedAt ?? new Date();
    this.source = source ?? new Source("", "");
  }
}

export class Source {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
