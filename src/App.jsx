import React from "react";
);
} else if (/^-\s.*/.test(tok)) {
parts.push(
<ul key={parts.length} className="list-disc pl-6">
{tok
.split("\n")
.filter(Boolean)
.map((line, i) => (
<li key={i}>{line.replace(/^-\s/, "")}</li>
))}
</ul>
);
} else {
parts.push(tok);
}
}
return <>{parts}</>;
}


// --- App Router (no external deps) ----------------------------------------
function useMiniRouter() {
const [route, setRoute] = React.useState({ name: "home", slug: null });
const go = (name, slug = null) => setRoute({ name, slug });
React.useEffect(() => {
window.__nav = (name, slug) => go(name, slug);
return () => void (window.__nav = null);
}, []);
return { route, go };
}


export default function App() {
const { route, go } = useMiniRouter();
const currentPost = demoPosts.find((p) => p.slug === route.slug);


return (
<Shell>
<AnimatePresence mode="wait">
{route.name === "home" && (
<motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
<Home go={go} posts={demoPosts} />
</motion.div>
)}
{route.name === "content" && (
<motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
<ContentList go={go} posts={demoPosts} />
</motion.div>
)}
{route.name === "post" && (
<motion.div key="post" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
<Article go={go} post={currentPost} />
</motion.div>
)}
</AnimatePresence>
</Shell>
);
}
