import React from "react";
import clustering from "density-clustering";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const getRandomCoord = (range) => {
  return Math.floor(Math.random() * range);
};

const clusteringDataSet = [...Array(100)].map((_, idx) => {
  return [getRandomCoord(100), getRandomCoord(100)];
});

const convertToCoordObject = (array, weight = 3) => {
  return array.map((point) => {
    return {
      x: point[0],
      y: point[1],
      z: weight,
    };
  });
};

export const ClusteringExample = () => {
  const [filteredData, setFilteredData] = React.useState(null);
  const [clustData, setClustData] = React.useState(null);
  const [neighborhoodRadius, setNeighborhoodRadius] = React.useState(3);

  React.useEffect(() => {
    const dbscan = new clustering.DBSCAN();
    // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    const clusters = dbscan.run(clusteringDataSet, neighborhoodRadius, 2);

    // get clustered points
    const pointsToRemove = [];
    const clusteredPoints = [];
    clusters.forEach((cluster) => {
      pointsToRemove.push(...cluster);
      const avgCoord = (cluster, position) => {
        return Math.round(
          cluster.reduce(
            (sum, curr) => (sum += clusteringDataSet[curr][position]),
            0
          ) / cluster.length
        );
      };

      const avgX = avgCoord(cluster, 0);
      const avgY = avgCoord(cluster, 1);
      clusteredPoints.push([avgX, avgY]);
    });

    // replace clustered points with new points
    const filteredDataSet = clusteringDataSet.filter(
      (_, idx) => !pointsToRemove.includes(idx)
    );

    setClustData(convertToCoordObject(clusteredPoints, neighborhoodRadius));
    setFilteredData(convertToCoordObject(filteredDataSet));
  }, [neighborhoodRadius]);

  return (
    <>
      <h2>Neighborhood Radius: {neighborhoodRadius}</h2>
      <div style={{ display: "flex" }}>
        <button onClick={() => setNeighborhoodRadius(neighborhoodRadius + 1)}>
          Plus 1
        </button>
        <button onClick={() => setNeighborhoodRadius(neighborhoodRadius - 1)}>
          Minus 1
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" unit="px" />
          <YAxis type="number" dataKey="y" name="y" unit="px" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Clustered" data={clustData} fill="#12ffaa" />
          <Scatter data={filteredData} fill="#8884d8" />
        </ScatterChart>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" unit="px" />
          <YAxis type="number" dataKey="y" name="y" unit="px" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            name="Clustered"
            data={convertToCoordObject(clusteringDataSet)}
            fill="#8884d8"
          />
        </ScatterChart>
      </div>
    </>
  );
};
