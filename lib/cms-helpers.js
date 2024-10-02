import { Text } from "slate";
import escapeHTML from "escape-html";
import { Fragment } from "react";
import Image from "next/image";

export const serializeCMSContent = (children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span
          dangerouslySetInnerHTML={{
            __html: escapeHTML(node.text),
          }}
        />
      );

      if (node.bold) {
        text = (
          <strong className="font-semibold" key={i}>
            {text}
          </strong>
        );
      }

      if (node.underline) {
        text = (
          <u className="underline" key={i}>
            {text}
          </u>
        );
      }

      if (node.italic) {
        text = (
          <em className="italic" key={i}>
            {text}
          </em>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h2":
        return (
          <h2 className="font-serif text-2xl my-2.5" key={i}>
            {serializeCMSContent(node.children)}
          </h2>
        );
      case "h3":
        return (
          <h3 className="font-serif text-xl my-2.5" key={i}>
            {serializeCMSContent(node.children)}
          </h3>
        );
      case "ul":
        return (
          <ul className="list-disc list-inside my-2.5" key={i}>
            {serializeCMSContent(node.children)}
          </ul>
        );
      case "li":
        return <li key={i}>{serializeCMSContent(node.children)}</li>;
      case "link":
        return (
          <a className="underline" href={escapeHTML(node.url)} key={i}>
            {serializeCMSContent(node.children)}
          </a>
        );
      case "upload":
        return (
          <Image
            unoptimized
            className="my-2.5"
            src={`${
              process.env.NEXT_PUBLIC_PAYLOAD_URL
            }${escapeHTML(node.value.url)}`}
            width={node.value.width}
            height={node.value.height}
            key={i}
          />
        );
      default:
        return (
          <p className="my-2.5" key={i}>
            {serializeCMSContent(node.children)}
          </p>
        );
    }
  });
