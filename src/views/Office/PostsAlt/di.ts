import { Post } from "@/types/data";
import { ComputedRef, InjectionKey } from "vue";

export const PostInject = Symbol() as InjectionKey<ComputedRef<Post>>