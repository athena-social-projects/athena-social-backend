import { IMediaSummary } from '../types/mediaTypes';
import leven from 'leven';

interface ISortingMedia {
  similarity: number;
  media: IMediaSummary;
}

const revertData = (excessMedia: ISortingMedia[]): IMediaSummary[] => {
  const revertedMedia: IMediaSummary[] = [];
  excessMedia.forEach((sortingData) => {
    revertedMedia.push(sortingData.media);
  });
  return revertedMedia;
};

export default function sortSearch(media: IMediaSummary[], search: string): IMediaSummary[] {
  const simalarMedia: ISortingMedia[] = [];
  media.forEach((entity) => {
    const sortedEntity: ISortingMedia = {
      media: entity,
      similarity: leven(search, entity.name),
    };
    simalarMedia.push(sortedEntity);
  });
  simalarMedia.sort((entityA, entityB) => entityA.similarity - entityB.similarity);
  return revertData(simalarMedia);
}
