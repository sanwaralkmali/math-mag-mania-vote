
export interface Magazine {
  id: string;
  title: string;
  grade: string;
  coverImage: string; // local or remote path, uses "/images/magazines/..." for local upload
  flipHtml5Url: string;
  qrCodeImage?: string; // "/images/qr_codes/..." for local upload
  votes: number;
}

export interface GradeGroup {
  grade: string;
  magazines: Magazine[];
}
