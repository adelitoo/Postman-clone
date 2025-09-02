import { useState, useEffect } from 'react';
import { Collection } from '../types/types';

interface UseSaveRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, collectionId: number) => void;
  collections: Collection[];
  initialCollectionId?: number;
  initialName?: string;
}

export const useSaveRequestDialog = ({
  isOpen,
  onClose,
  onSave,
  collections,
  initialCollectionId,
  initialName = '',
}: UseSaveRequestDialogProps) => {
  const [requestName, setRequestName] = useState(initialName);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | undefined>(
    initialCollectionId || (collections.length > 0 ? collections[0].id : undefined)
  );

  useEffect(() => {
    if (isOpen) {
      setRequestName(initialName);
      setSelectedCollectionId(
        initialCollectionId || (collections.length > 0 ? collections[0].id : undefined)
      );
    }
  }, [isOpen, initialName, initialCollectionId, collections]);

  const handleSave = () => {
    if (requestName.trim() && selectedCollectionId) {
      onSave(requestName, selectedCollectionId);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return {
    requestName,
    setRequestName,
    selectedCollectionId,
    setSelectedCollectionId,
    handleSave,
    handleOverlayClick,
  };
}; 