import { getWorkLog, saveWorkLog } from "./actions/log";

export default async function Home() {
	const logs = await getWorkLog();
	return (
		<>
			<div className="m-5 flex gap-10 justify-between">
				<form action={saveWorkLog}>
					<div>
						<h1 className="text-3xl font-semibold text-center">
							Zeiterfassung
						</h1>
						<br />
						<label htmlFor="starttime">Name</label>
						<input
							id="name"
							type="text"
							name="name"
							required
							className="border p-3 border-gray-200 w-full mb-4"
						/>
						<label htmlFor="starttime">Beginn</label>
						<input
							id="starttime"
							type="time"
							name="starttime"
							required
							className="border p-3 border-gray-200 w-full mb-4"
						/>
						<label htmlFor="endtime">Ende</label>
						<input
							id="endtime"
							type="time"
							required
							name="endtime"
							className="border p-3 border-gray-200 w-full"
						/>
						<br />
						<br />
						<button className="w-full bg-blue-600 rounded-md p-4 text-white">
							Senden
						</button>
						<input
							type="reset"
							value="Reset"
							className="bg-gray-300 cursor-pointer w-full text-white p-4 mt-4"
						/>
					</div>
				</form>
				<div className="flex-1">
					<h1 className="text-3xl font-semibold text-center">
						Übersicht
					</h1>
					<br />
					<br />
					<div className="h-[80vh] overflow-scroll">
						<table className="table-auto w-full  border-collapse">
							<thead>
								<tr>
									<th className="border text-left p-2 border-gray-100">
										Name
									</th>
									<th className="border text-left p-2 border-gray-100">
										Beginn
									</th>
									<th className="border text-left p-2 border-gray-100">
										Ende
									</th>
									<th className="border text-left p-2 border-gray-100">
										Stunden
									</th>
									<th className="border text-left p-2 border-gray-100">
										Datum
									</th>
								</tr>
							</thead>
							<tbody>
								{logs.map((log) => (
									<tr key={String(log._id)}>
										<td className="border boerder-gray-100 p-2">
											{log.name}
										</td>
										<td className="border boerder-gray-100 p-2">
											{log.starttime}
										</td>
										<td className="border boerder-gray-100 p-2">
											{log.endtime}
										</td>
										<td className="border boerder-gray-100 p-2">
											{
												log.endtime.split(":")[0] -
													log.starttime.split(":")[0]
											}
										</td>
										<td className="border boerder-gray-100 p-2">
											{new Date(
												log.createdAt
											).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
