import getSecret from "../lib/secrets";

/**
 * This Script file will be run individually with `tsx` under package.json
 * so we cannot use absolute import '@/app', which only for nextjs
 * */
getSecret("DATABASE_URL")
  .then((val) => {
    console.log(`Database URL: ${val.slice(0, 25)}`);
  })
  .catch((err) => {
    console.error(`error: ${err}`);
  });
