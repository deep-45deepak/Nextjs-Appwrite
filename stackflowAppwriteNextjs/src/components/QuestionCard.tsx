"use client";

import React from "react";
import { BorderBeam } from "./magicui/border-beam";
import Link from "next/link";
import { Models } from "appwrite";
import slugify from "@/utils/slugify";
import { avatars } from "@/models/client/config";
import convertDateToRelativeTime from "@/utils/relativeTime";

const QuestionCard = ({ ques }: { ques: Models.Document }) => {
    const [height, setHeight] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-[#1c1c1c] hover:to-[#282839] sm:flex-row shadow-md shadow-black/20"
        >
            <BorderBeam size={height} duration={12} delay={9} />
            <div className="relative shrink-0 text-center sm:text-right text-sm text-white/80">
                <p><strong className="text-white">{ques.totalVotes}</strong> votes</p>
                <p><strong className="text-white">{ques.totalAnswers}</strong> answers</p>
            </div>
            <div className="relative w-full">
                <Link
                    href={`/questions/${ques.$id}/${slugify(ques.title)}`}
                    className="block text-orange-500 hover:text-orange-400 transition-colors"
                >
                    <h2 className="text-2xl font-semibold tracking-tight mb-2 leading-snug line-clamp-2">
                        {ques.title}
                    </h2>
                </Link>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
                    {ques.tags.map((tag: string) => (
                        <Link
                            key={tag}
                            href={`/questions?tag=${tag}`}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20 transition"
                        >
                            #{tag}
                        </Link>
                    ))}
                    <div className="ml-auto flex items-center gap-2">
                        <img
                            src={avatars.getInitials(ques.author.name, 24, 24).href}
                            alt={ques.author.name}
                            className="h-7 w-7 rounded-full border border-white/20"
                        />
                        <Link
                            href={`/users/${ques.author.$id}/${slugify(ques.author.name)}`}
                            className="font-medium text-orange-500 hover:text-orange-400"
                        >
                            {ques.author.name}
                        </Link>
                        <span className="text-xs text-white/50">"{ques.author.reputation}"</span>
                    </div>
                    <span className="text-xs ml-1 text-white/50">
                        asked {convertDateToRelativeTime(new Date(ques.$createdAt))}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;