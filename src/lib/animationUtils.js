/* eslint-disable no-await-in-loop */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animate(animation = {}, walk) {
  const {
    sequence,
    onSequenceEnded,
    waitBeforeEnd,
    waitBeforeStart,
  } = animation;

  if (sequence) {
    await sleep(waitBeforeStart);

    for (let i = 0; i < sequence.length; i += 1) {
      await sequence[i](walk);
    }
    await sleep(waitBeforeEnd);
    onSequenceEnded();
  }
}

export async function moveCharacter(steps, direction, walk, delay = 60) {
  for (let i = 0; i < steps; i += 1) {
    walk(direction);
    await sleep(delay);
  }
}
