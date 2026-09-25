export type BlogSection = {
  heading: string;
  paragraphs: string[];
  code?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  sample?: boolean;
  sections: BlogSection[];
};
