export interface Product {
  id?: string;
  _id?: string; // For backward compatibility with MongoDB IDs if needed
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  affiliateLink: string;
  createdAt: any; // Using Firestore Timestamp or Date
}
