import { Link } from "react-router-dom";

export default function TButton({
  color = "indigo",
  to = "",
  circle = false,
  href = "",
  link = false,
  target = "_blank",
  onClick = () => {},
  children,
  className = "",
  mono = false,
  fontSize = "sm", // Added fontSize prop with default value "sm"
}) {
  let classes = [
    "inline-flex",
    "items-center",
    "justify-center",
    `text-${fontSize}`, // Dynamically apply font size based on fontSize prop
    `border-${color}-500`, // Set border color based on the color prop
    "rounded-md", // Apply rounded corners
    "px-2", // Apply horizontal padding
    "py-1", // Apply vertical padding
  ];

  if (mono) {
    classes.push("font-mono");
  }

  if (link) {
    classes = [...classes, "transition-colors"];

    switch (color) {
      case "indigo":
        classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
        break;
      case "red":
        classes = [...classes, "text-red-500", "focus:border-red-500"];
        break;
      case "blue":
        classes = [...classes, "text-blue-500", "focus:border-blue-500"];
    }
  } else {
    // Update color classes for non-link buttons
    switch (color) {
      case "indigo":
        classes = [
          ...classes,
          "text-white", // Change text color to white
          "bg-indigo-600",
          "hover:bg-indigo-700",
          "focus:ring-indigo-500",
        ];
        break;
      case "red":
        classes = [
          ...classes,
          "text-white", // Change text color to white
          "bg-red-600",
          "hover:bg-red-700",
          "focus:ring-red-500",
        ];
        break;
      case "green":
        classes = [
          ...classes,
          "text-white", // Change text color to white
          "bg-emerald-500",
          "hover:bg-emerald-600",
          "focus:ring-emerald-400",
        ];
        break;
      case "blue":
        classes = [
          ...classes,
          "text-white", // Change text color to white
          "bg-blue-500",
          "hover:bg-blue-600",
          "focus:ring-blue-400",
        ];
        break;
      case "yellow": // Add support for yellow color
        classes = [
          ...classes,
          "text-white", // Change text color to black
          "bg-yellow-600",
          "hover:bg-yellow-500",
          "focus:ring-yellow-300",
        ];
        break;
      case "orange": // Add support for orange color
        classes = [
          ...classes,
          "text-white", // Change text color to white
          "bg-orange-500",
          "hover:bg-orange-600",
          "focus:ring-orange-400",
        ];
        break;
      case "white": // Add support for white color
        classes = [
          ...classes,
          "text-black", // Change text color to black
          "bg-white",
          "hover:bg-gray-200",
          "focus:ring-gray-300",
        ];
        break;
    }
  }

  if (circle) {
    classes = [
      ...classes,
      "h-8",
      "w-8",
      "items-center",
      "justify-center",
      "rounded-full",
    ];
  } else {
    classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
  }

  // Add custom className if provided
  if (className) {
    classes = [...classes, className];
  }

  return (
    <>
      {href && (
        <a href={href} className={classes.join(" ")} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={classes.join(" ")}>
          {children}
        </button>
      )}
    </>
  );
}
