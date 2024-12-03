import MessageResponse from "@/types/MessageResponse";

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
