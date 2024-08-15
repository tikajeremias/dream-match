import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
// Funcion de utility necesaria de Shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}