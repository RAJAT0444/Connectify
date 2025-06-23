
import type { IMessage } from "@/model/User";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: IMessage[];
  data?: T; // Optional, agar kisi aur data ko return karna ho
}
