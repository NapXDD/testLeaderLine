import LeaderLine from "leader-line-new";

export const createLine = (id1: string, id2: string) => {
  return new LeaderLine(
    document.querySelector(id1) as HTMLDivElement,
    document.querySelector(id2) as HTMLDivElement
  );
};
