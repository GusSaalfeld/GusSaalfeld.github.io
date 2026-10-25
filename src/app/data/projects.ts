import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them. The petri dish puts one oat in for each, in the same order

export const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "UX writing",
        hoverDescription: "Feature announcement + UX microcopy.",
        iconPath: "/ux.jfif"
    },
    {
        path: "scientific-explainer",
        title: "Scientific explainer",
        hoverDescription: "A brief guide to web browsers.",
        iconPath: ""
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "I developed a training manual for new baristas at my workplace.",
        iconPath: ""
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        iconPath: ""
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "",
        iconPath: ""
    },
    {
        path: "growing-mushrooms",
        title: "Growing mushrooms",
        hoverDescription: "",
        iconPath: ""
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "",
        iconPath: ""
    },
];

