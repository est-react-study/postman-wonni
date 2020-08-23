export const getIP = async (): Promise<void> => {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getNavigator = async (): Promise<any> => {
  try {
    const response = navigator;
    return response;
  } catch (error) {
    console.log(error);
  }
};
