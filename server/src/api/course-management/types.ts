export interface CreateCourseDto {
    title: string;
    description?: string;
    category: string;
    thumbnail?: string;
}
export interface UpdateCourseDto {
    title?: string;
    description?: string;
    category?: string;
    thumbnail?: string;
}
