export function ErrorFormat(error: string){
    const message = error.split(";").map((error) => {
      if(error.startsWith('Validation error:')){
        const phase1 = error.split(":")[1].trim();
        return phase1.split(`at "`)[0].trim();
      }
      return error.split(`at "`)[0].trim();
    });
    return message;
  }
  