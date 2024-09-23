interface RootObject {
  code: number;
  msg: Msg;
  data: Data;
  url: string;
  wait: number;
}

interface Data {
  page: Page;
  list: List[];
  qrcode_count: number;
  org_id: number;
  category_name: string;
  category_web_url: string;
}

interface List {
  id: number;
  org_id: number;
  qrcode_count: number;
  list_name: string;
  category_count: number;
  list_type: string;
  web_url: string;
  coding: string;
  first_images: string[];
  cover_image: string;
}

interface Page {
  current_page: number;
  list_size: number;
  lasted_page: number;
  record_total: number;
  qrcode_count: number;
  category_count: number;
}

interface Msg {
  text: string;
  code: number;
}