export abstract class Service<T> {
    public abstract create(entity: T): void
    public abstract update(entity: T): void
    public abstract delete(id: string): void
    public abstract get(id: string): Promise<T | null>
    public abstract list(): Promise<Array<T>>

    protected abstract getRequiredFields(): string[]

    protected validate(entity: T): void {
        const missingFields: string[] = this.getRequiredFields().filter(fieldName => {
            try {
                const value = (entity as any)[fieldName];
                return value === undefined;
            } catch (e) {
                console.error(e);
                return true;
            }
        });
        
        if (missingFields.length > 0) {
            throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
        }
    }
}