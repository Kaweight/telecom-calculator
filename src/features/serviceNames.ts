interface ServiceLabels {
  [key: string]: { label: string };
}

export const SERVICES: ServiceLabels = {
  internet: {
    label: "Internet",
  },
  tv: {
    label: "Telewizja",
  },
  internetAndTv: {
    label: "Internet + Telewizja",
  },
  phoneSubscription: {
    label: "Abonament telefoniczny",
  },
  decoder4K: {
    label: "Dekoder 4K",
  },
};
