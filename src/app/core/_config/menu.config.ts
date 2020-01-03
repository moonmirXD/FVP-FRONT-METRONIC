export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: "Dashboards",
					root: true,
					alignment: "left",
					page: "/dashboard",
					translate: "Dashboard"
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: "Power Card",
					root: true,
					icon: "flaticon2-expand",
					page: "/admin",
					bullet: "dot",
					submenu: [
						{
							title: "Add Power Card",
							page: "/powercard-add"
						},
						{
							title: "Power Card List",
							page: "/powercard-list"
						}
					]
				},
				{
					title: "Gallery",
					root: true,
					icon: "flaticon2-expand",
					page: "/admin",
					bullet: "dot",
					submenu: [
						{
							title: "Add Gallery",
							page: "/gallery-add"
						},
						{
							title: "Gallery List",
							page: "/gallery-list"
						}
					]
				},
				{
					title: "Logout",
					root: true,
					icon: "flaticon2-expand",
					page: "/adminlogin"
				}
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
