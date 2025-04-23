
export interface Magazine {
  id: string;
  title: string;
  grade: string;
  coverImage: string;
  flipHtml5Url: string;
  qrCodeImage?: string;
  votes: number;
}

export interface GradeGroup {
  grade: string;
  magazines: Magazine[];
}
